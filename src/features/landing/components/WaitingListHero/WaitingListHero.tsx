'use client';

import { Button } from '@/components/ui/button';
import CountUp from 'react-countup';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { PhoneInput } from 'react-international-phone';

import 'react-international-phone/style.css';
import { LogoWhatsApp } from '@/components/atoms/logos';
import { registerUserToWhatsAppWaitingList } from './action';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { useTrackingContext } from '@/lib/analytics';

const PROMPTS = ['Salut', 'I ni ce', 'Hello', 'Hola', '你好', 'Ciao', 'Olá', 'Hallo', 'مرحبا'];
const WAITING_LIST_SUBSCRIPTION_TARGET = 2_000;
const STARTING_COUNT_IN_WAITING_LIST = 500;
const INTERVAL_DURATION = 2_000;

const FormSchema = z.object({ phoneNumber: z.string() });

interface WaitingListHeroProps {
  currentUserWaitingListPosition?: number;
  totalWaitingListSubscribers: number;
}

export const WaitingListHero = ({
  currentUserWaitingListPosition,
  totalWaitingListSubscribers
}: WaitingListHeroProps) => {
  const { trackEvent, sendIdentifyEvent } = useTrackingContext();
  const t = useTranslations();
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [isLoading, startTransition] = useTransition();
  const { toast } = useToast();
  const subscriptionLeftBeforeOpening =
    WAITING_LIST_SUBSCRIPTION_TARGET - totalWaitingListSubscribers - STARTING_COUNT_IN_WAITING_LIST;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { phoneNumber: '' }
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    startTransition(() =>
      registerUserToWhatsAppWaitingList(data.phoneNumber)
        .then(() => {
          form.reset();
          toast({ title: 'You have joined it!', description: 'We will notify you when we are ready' });
          sendIdentifyEvent({ hekima_whatsapp_phone_number: data.phoneNumber });
          trackEvent('Waiting List Form Submitted', {
            whatsAppPhoneNumber: data.phoneNumber
          });
        })
        .catch(() => {
          toast({ title: 'Something went wrong', description: 'Please try again later', variant: 'destructive' });
        })
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPromptIndex((prevIndex) => (prevIndex + 1) % PROMPTS.length);
    }, INTERVAL_DURATION);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <section className="flex flex-col items-center gap-y-10 text-center">
      <h1 className="flex flex-col items-center text-7xl sm:text-9xl">
        <div className="relative">
          <p className="opacity-0" aria-hidden="true">
            {t('common.app_name')}
          </p>
          {PROMPTS.map((prompt) => (
            <p
              key={prompt}
              className={cn(
                'absolute w-full text-center top-0 min-h-20 sm:min-h-32 opacity-0 transition ease-in-out duration-700',
                PROMPTS[currentPromptIndex] === prompt && 'opacity-1'
              )}
            >
              {prompt}
            </p>
          ))}
        </div>
        <p>{t('common.app_name')}</p>
      </h1>
      {currentUserWaitingListPosition ? (
        <div>
          {subscriptionLeftBeforeOpening > 0 ? (
            <span>
              {t.rich('landing_page.waiting_list__remaining_subscribers', {
                span: (children) => <span className="font-bold">{children}</span>,
                subscriptionLeftBeforeOpening: subscriptionLeftBeforeOpening
              })}
            </span>
          ) : (
            <span>
              {t.rich('landing_page.waiting_list__reached_target_text', {
                br: () => <br />,
                target: WAITING_LIST_SUBSCRIPTION_TARGET
              })}
            </span>
          )}
        </div>
      ) : (
        <p className="text-xl">{t('landing_page.waiting_list__text')}</p>
      )}

      <div className="mt-10 w-full sm:w-fit">
        {currentUserWaitingListPosition ? (
          <div>
            <p>{t('landing_page.waiting_list__user_position_text')}</p>
            <CountUp
              className="text-6xl font-medium"
              start={1}
              end={STARTING_COUNT_IN_WAITING_LIST + currentUserWaitingListPosition}
            />
          </div>
        ) : (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex h-fit w-full flex-col gap-6 text-black md:flex-row"
            >
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative flex w-full items-center">
                        <PhoneInput
                          defaultCountry="ml"
                          countrySelectorStyleProps={{ buttonClassName: '!h-11 !px-4 !rounded-tl-md !rounded-bl-md' }}
                          disableCountryGuess
                          placeholder="WhatsApp number"
                          className="w-full"
                          inputClassName="!h-11 w-full sm:w-52 !rounded-r-md border border-primary/60 !pr-8 !text-base !sm:text-sm !text-primary placeholder:text-primary/60 focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50"
                          {...field}
                        />
                        <LogoWhatsApp className="absolute right-2 w-6 text-[#25d366] opacity-80" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" size="lg" isLoading={isLoading}>
                {t('landing_page.waiting_list__cta_title')}
              </Button>
            </form>
          </Form>
        )}
      </div>
    </section>
  );
};
