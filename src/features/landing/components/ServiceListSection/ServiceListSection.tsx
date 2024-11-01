import { ArrowTopRightIcon } from '@radix-ui/react-icons';
import SectionTitle from '@/features/landing/components/SectionTitle';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const services = [
  { title: 'Search engine optimization', image: '/landing/services/search.png', href: '#', colorScheme: 'muted' },
  {
    title: 'Pay-per-click advertising',
    image: '/landing/services/browser_click.png',
    href: '#',
    colorScheme: 'secondary'
  },
  { title: 'Social Media Marketing', image: '/landing/services/rating.png', href: '#', colorScheme: 'black' },
  { title: 'Email Marketing', image: '/landing/services/messages.png', href: '#', colorScheme: 'muted' },
  { title: 'Content Creation', image: '/landing/services/notifications.png', href: '#', colorScheme: 'secondary' },
  { title: 'Analytics and Tracking', image: '/landing/services/statistics.png', href: '#', colorScheme: 'black' }
] as const;

const ServiceListSection = () => {
  return (
    <section className="flex flex-col gap-y-14">
      <SectionTitle
        title="Services"
        subtitle={
          <>
            At our digital marketing agency, we offer a range of services to
            <br />
            help businesses grow and succeed online. These services include:
          </>
        }
      />

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        {services.map(({ title, href, image, colorScheme }) => (
          <div
            key={title}
            className={cn(
              'relative flex h-96 lg:h-80 gap-x-10 rounded-3xl border border-muted-foreground bg-muted p-12',
              colorScheme === 'secondary' && 'bg-secondary',
              colorScheme === 'black' && 'bg-tertiary'
            )}
          >
            <div className="absolute left-0 top-1.5 -z-10 size-full rounded-3xl bg-tertiary" />
            <div className="flex flex-1 flex-col justify-between">
              <div>
                <h3
                  className={cn('highlighted-text-secondary', colorScheme === 'secondary' && 'highlighted-text-white')}
                >
                  {title}
                </h3>
              </div>
              <div className="flex md:justify-end lg:hidden">
                <Image src={image} alt={title} width={130} height={130} />
              </div>
              <Link href={href} className={cn('flex items-center gap-x-4', colorScheme === 'black' && 'text-white')}>
                <div className={cn('w-fit rounded-full bg-tertiary p-2', colorScheme === 'black' && 'bg-white')}>
                  <ArrowTopRightIcon
                    width={25}
                    height={25}
                    className={cn('stroke-secondary', colorScheme === 'black' && 'stroke-black')}
                  />
                </div>
                <p className="text-xl">Learn More</p>
              </Link>
            </div>
            <div className="hidden flex-1 items-center justify-center lg:flex">
              <Image src={image} alt={title} width={230} height={230} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServiceListSection;
