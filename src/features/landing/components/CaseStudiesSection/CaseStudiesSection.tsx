import { ArrowTopRightIcon } from '@radix-ui/react-icons';
import SectionTitle from '@/features/landing/components/SectionTitle';
import Link from 'next/link';
import { Fragment } from 'react';

const caseStudies = [
  {
    title:
      'For a local restaurant, we implemented a targeted PPC campaign that resulted in a 50% increase in website traffic and a 25% increase in sales.',
    href: '#'
  },

  {
    title:
      'For a B2B software company, we developed an SEO strategy that resulted in a first page ranking for key keywords and a 200% increase in organic traffic.',
    href: '#'
  },

  {
    title:
      'For a national retail chain, we created a social media marketing campaign that increased followers by 25% and generated a 20% increase in online sales.',
    href: '#'
  }
] as const;

const CaseStudiesSection = () => {
  return (
    <section className="flex flex-col gap-y-14">
      <SectionTitle
        title="Case Studies"
        subtitle={
          <>
            Explore Real-Life Examples of Our Proven Digital Marketing
            <br />
            Success through Our Case Studies
          </>
        }
      />

      <div className="flex flex-col gap-10 rounded-3xl bg-tertiary p-12 md:flex-row">
        {caseStudies.map(({ title, href }, index) => (
          <Fragment key={title}>
            {index !== 0 && <div className="bottom-2 mx-16 h-full border" />}
            <div className="space-y-3">
              <p className="text-white">{title}</p>

              <Link href={href} className="flex items-center gap-x-2 text-secondary">
                <p className="text-xl">Learn More</p>{' '}
                <ArrowTopRightIcon width={20} height={20} className="stroke-secondary" />
              </Link>
            </div>
          </Fragment>
        ))}
      </div>
    </section>
  );
};

export default CaseStudiesSection;
