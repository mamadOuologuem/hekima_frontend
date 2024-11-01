'use client';

import { subscribeEmailToNewsletter } from '@/lib/email-service';
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

const FormSchema = z.object({ email: z.string().email() });

const menuItems = [
  { name: 'About Us', href: '#' },
  { name: 'Services', href: '#' },
  { name: 'Use Cases', href: '#' },
  { name: 'Pricing', href: '#' },
  { name: 'Blog', href: '#' }
];

const Footer = () => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({ resolver: zodResolver(FormSchema), defaultValues: { email: '' } });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    await subscribeEmailToNewsletter(data.email)
      .then(() => {
        form.reset();
        toast({ title: 'Subscribed!', description: 'You have successfully subscribed to our newsletter' });
      })
      .catch(() => {
        toast({ title: 'Failed to subscribe', description: 'Please try again later', variant: 'destructive' });
      });
  };

  return (
    <footer className="flex flex-col gap-16 rounded-t-3xl border border-tertiary bg-tertiary p-10 text-white">
      <div className="flex w-full justify-between">
        <Logo />
        <div className="space-x-5">
          {menuItems.map((item) => (
            <Link key={item.name} href={item.href} className="underline">
              {item.name}
            </Link>
          ))}
        </div>
        <SocialMedia className="hidden md:flex" />
      </div>

      <div className="flex flex-col justify-between gap-10 sm:flex-row sm:items-center">
        <div className="space-y-4">
          <h4 className="ml-2 text-black highlighted-text-secondary">Contact us:</h4>
          <p>Email: info@hekima.ai</p>
          <p>Phone: 555-567-8901</p>
          <p>
            Address: 1234 Main St
            <br />
            Moonstone City, Stardust State 12345
          </p>
        </div>
        <div className="h-fit rounded-lg bg-[#292A32] px-14 py-10">
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
                      <Input placeholder="Email" {...field} className="h-11" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" size="lg" variant="secondary">
                Subscribe to news
              </Button>
            </form>
          </Form>
        </div>
      </div>

      <SocialMedia className="mx-auto flex md:hidden" />

      <hr className="-my-6 h-0.5" />

      <div className="flex gap-x-6">
        <p>© {new Date().getFullYear()} Hekima. All Rights Reserved.</p>
        <Link href="#" className="underline">
          Privacy Policy
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
