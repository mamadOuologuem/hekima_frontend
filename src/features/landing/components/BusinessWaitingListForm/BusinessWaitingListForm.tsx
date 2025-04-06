'use client';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useTrackingContext } from '@/lib/analytics';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';
import Logo from '@/components/atoms/Logo';
import {
  BusinessWaitingListFormSchema,
  BusinessWaitingListFormValues,
  CommonSectorOfActivities,
  CompanySizes,
  DigitalMedias
} from './schema';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Combobox } from '@/components/ui/combobox';
import { useState, useTransition } from 'react';
import { MultiSelect } from '@/components/ui/multi-select';
import { registerBusinessToWaitingList } from './action';
import { useRouter } from 'next/navigation';

export const BusinessWaitingListForm = () => {
  const t = useTranslations('landing_page');
  const router = useRouter();
  const [isLoading, startTransition] = useTransition();
  const [sectorOfActivities, setSectorOfActivities] = useState<Set<string>>(new Set(CommonSectorOfActivities));

  const { trackEvent, sendIdentifyEvent } = useTrackingContext();

  const form = useForm<z.infer<typeof BusinessWaitingListFormSchema>>({
    resolver: zodResolver(BusinessWaitingListFormSchema),
    defaultValues: {
      email: '',
      businessPhone: '',
      businessSize: undefined,
      sectorOfActivity: '',
      digitalMedias: [],
      websiteUrl: '',
      businessName: '',
      needs: ''
    }
  });
  const { toast } = useToast();

  const onSubmit = async (data: BusinessWaitingListFormValues) => {
    startTransition(() =>
      registerBusinessToWaitingList(data)
        .then(() => {
          form.reset();
          toast({
            title: 'Vous êtes inscrit sur la liste d’attente',
            description: 'Nous vous contacterons dès le lancement de la plateforme B2B.'
          });
          sendIdentifyEvent({ hekima_business_email: data.email });
          trackEvent('Business Waiting List Form Submitted', {
            ...data,
            digitalMedias: data.digitalMedias.join(', '),
            businessEmail: data.email
          });
          router.refresh();
        })
        .catch(() => {
          toast({
            title: 'Oups ! Une erreur s’est produite.',
            description: 'Veuillez vérifier vos coordonnées et réessayer.',
            variant: 'destructive'
          });
        })
    );
  };

  return (
    <section className="relative flex h-full flex-col items-center justify-center">
      <div className="my-16 w-full rounded-3xl bg-secondary-light p-8 text-primary md:my-0 md:p-16">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
            <div className="grid grid-cols-1 gap-y-4 md:grid-cols-3 md:gap-4">
              <FormField
                control={form.control}
                name="businessName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom de l&apos;entreprise</FormLabel>
                    <FormControl>
                      <Input placeholder="Votre entreprise" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('business_waiting_list__email_field_label')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('business_waiting_list__email_field_placeholder')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="businessPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('business_waiting_list__phone_field_label')}</FormLabel>
                    <FormControl>
                      <PhoneInput
                        defaultCountry="ml"
                        countrySelectorStyleProps={{
                          buttonClassName: '!bg-background !h-10 !px-4 !rounded-tl-md !rounded-bl-md'
                        }}
                        disableCountryGuess
                        placeholder="WhatsApp number"
                        className="w-full"
                        inputClassName="!bg-background !h-10 w-full !rounded-r-md border border-primary/60 !pr-8 !text-base !sm:text-sm !text-primary placeholder:text-primary/60 focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 gap-y-4 md:grid-cols-3 md:gap-4">
              <FormField
                control={form.control}
                name="digitalMedias"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Moyens de communication</FormLabel>
                    <FormControl>
                      <MultiSelect
                        options={DigitalMedias.map((item) => ({ label: item, value: item }))}
                        onValueChange={field.onChange}
                        placeholder="Sélectionner un ou plusieurs"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="sectorOfActivity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Secteur d&apos;activité</FormLabel>
                    <FormControl>
                      <Combobox
                        className="w-full"
                        options={[...sectorOfActivities].map((item) => ({ label: item, value: item }))}
                        placeholder="Sélectionner un secteur"
                        selected={field.value ?? ''}
                        onChange={({ value }) => field.onChange(value)}
                        onCreate={(value) => {
                          setSectorOfActivities((prev) => new Set([...prev, value]));
                          field.onChange(value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 gap-y-4 md:grid-cols-3 md:gap-4">
              <FormField
                control={form.control}
                name="businessSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('business_waiting_list__size_field_label')}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t('business_waiting_list__size_field_placeholder')} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {CompanySizes.map((size) => (
                          <SelectItem key={size} value={size}>
                            {size}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="websiteUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Adresse du site web</FormLabel>
                    <FormControl>
                      <Input placeholder="Votre site internet" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="needs"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Votre besoin</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Quels sont vos objectifs ?" rows={6} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" isLoading={isLoading}>
              {t('contact_us__submit_button_title')}
            </Button>
          </form>
        </Form>
      </div>

      <Logo className="absolute bottom-6 text-white md:bottom-8" />
    </section>
  );
};
