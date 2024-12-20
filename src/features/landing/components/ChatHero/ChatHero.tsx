'use client';

import { TypewriterText } from '@/components/atoms/TypewriterText';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { addContactToList } from '@/lib/marketing';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { PhoneInput } from 'react-international-phone';

import 'react-international-phone/style.css';
import { LogoWhatsApp } from '@/components/atoms/logos';

const PROMPTS = ['Bonjour', 'I ni ce', 'Hello', 'Hola', '你好', 'Ciao', 'Olá', 'Hallo', 'مرحبا'];

const INTERVAL_DURATION = 3_000;
const TYPE_SPEED = 200;

const FormSchema = z.object({ phoneNumber: z.string() });

const ChatHero = () => {
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { phoneNumber: '' }
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    await addContactToList('WAITING_LIST', { phone: data.phoneNumber, attributes: { source: 'landing' } })
      .then(() => {
        form.reset();
        toast({ title: 'Subscribed!', description: 'You have successfully subscribed to our newsletter' });
      })
      .catch(() => {
        toast({ title: 'Failed to subscribe', description: 'Please try again later', variant: 'destructive' });
      });
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
      <h1 className="flex flex-col items-center">
        <TypewriterText as="p" typeSpeed={TYPE_SPEED}>
          {PROMPTS[currentPromptIndex]}
        </TypewriterText>
        <p>Hekima!</p>
      </h1>
      <p className="text-xl">Ask in your own language, and get answers that speak directly to you</p>

      <div className="mt-10 w-fit">
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
                    <div className="relative flex items-center">
                      <PhoneInput
                        defaultCountry="ml"
                        countrySelectorStyleProps={{ buttonClassName: '!h-11 !px-4 !rounded-tl-md !rounded-bl-md' }}
                        disableCountryGuess
                        placeholder="WhatsApp number"
                        inputClassName="!h-11 w-44 !rounded-r-md border border-primary/60 !pr-8 text-sm !text-primary placeholder:text-primary/60 focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50"
                        {...field}
                      />
                      <LogoWhatsApp className="absolute right-2 w-6 opacity-80" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" size="lg">
              Join the waiting list
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default ChatHero;
