'use client';

import { addContactToList } from '@/lib/marketing';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Logo from '@/components/atoms/Logo';
import Link from 'next/link';
import SocialMedia from './components/SocialMedia';
import { useToast } from '@/hooks/use-toast';
import { useTranslations } from 'next-intl';
import { useMenuItems } from '../AppBar/utils';
import { useTrackingContext } from '@/lib/analytics';

const FormSchema = z.object({ email: z.string().email() });

const Footer = () => {
  const { trackEvent, sendIdentifyEvent } = useTrackingContext();
  const t = useTranslations('landing_page');
  const { toast } = useToast();
  const menuItems = useMenuItems();

  const form = useForm<z.infer<typeof FormSchema>>({ resolver: zodResolver(FormSchema), defaultValues: { email: '' } });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    await addContactToList('NEWSLETTER', { email: data.email })
      .then(() => {
        form.reset();
        toast({ title: 'Subscribed!', description: 'You have successfully subscribed to our newsletter' });
        sendIdentifyEvent({ hekima_newsletter_email: data.email });
        trackEvent('Newsletter Form Submitted', { userEmail: data.email });
      })
      .catch(() => {
        toast({ title: 'Failed to subscribe', description: 'Please try again later', variant: 'destructive' });
      });
  };

  return (
    <footer className="flex flex-col gap-16 rounded-t-3xl border border-primary bg-primary p-10 text-white">
      <div className="flex w-full flex-col justify-between gap-5 md:flex-row">
        <Logo className="text-white" />
        <div className="flex flex-col gap-5 md:flex-row">
          {menuItems.map((item) => (
            <Link key={item.name} href={item.href} className="underline">
              {item.name}
            </Link>
          ))}
        </div>
        <SocialMedia className="hidden lg:flex" />
      </div>

      <div className="flex flex-col justify-between gap-10 sm:flex-row sm:items-center">
        <div className="flex flex-col items-start space-y-4">
          <h4 className="text-black highlighted-text-secondary">{t('footer__contact_us')}</h4>
          <a target="_blank" href="mailto:info@hekima-ai.com">
            {t('footer__contact_us_email', { email: 'info@hekima-ai.com' })}
          </a>
          <a target="_blank" href="https://wa.me/14245249123">
            {t('footer__contact_us_phone', { phone: '+1 (424) 524-9123' })}
          </a>
        </div>
        <div className="h-fit px-0 py-8 md:px-14 md:py-10">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex h-fit w-full flex-col gap-6 text-black md:flex-row"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Email"
                        {...field}
                        className="h-11 bg-transparent text-primary-foreground placeholder:text-primary-foreground"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" size="lg" className="bg-white text-primary hover:bg-white/70">
                {t('footer__newsletter_subscribe_button_title')}
              </Button>
            </form>
          </Form>
        </div>
      </div>

      <SocialMedia className="mx-auto flex lg:hidden" />

      <hr className="-my-6 h-0.5" />

      <div className="flex gap-x-6">
        <p>{t('footer__rights_reserved', { year: new Date().getFullYear() })}</p>
        <Link href="/support" className="underline">
          {t('footer__privacy_policy_link_title')}
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
