'use client';

import { StarFilledIcon, ArrowRightIcon, ArrowLeftIcon } from '@radix-ui/react-icons';
import SectionTitle from '@/features/landing/components/SectionTitle';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

const testimonials = [
  {
    author: 'John Smith',
    position: 'Marketing Director at XYZ Corp',
    testimonial:
      '"We have been working with Positivus for the past year and have seen a significant increase in website traffic and leads as a result of their efforts. The team is professional, responsive, and truly cares about the success of our business. We highly recommend Positivus to any company looking to grow their online presence."'
  },
  {
    author: 'Mary Harris',
    position: 'Owner of ABC Company',
    testimonial:
      '"Sunt cillum culpa eiusmod mollit do ipsum. Sint eu sint nostrud nostrud commodo cupidatat excepteur ipsum veniam proident duis veniam. Elit nisi ut exercitation nostrud ex qui anim cupidatat consectetur."'
  },
  {
    author: 'Sara Lee',
    position: 'Tech Lead at Wright Inc',
    testimonial:
      '"Do eu labore dolor amet sit quis consectetur laborum dolor laboris eiusmod. Ea deserunt consequat culpa esse Lorem laborum pariatur fugiat. Eu enim esse consequat fugiat nostrud excepteur veniam in. Cupidatat laboris incididunt ad tempor ea occaecat et consectetur aliquip. Tempor duis in in dolore voluptate. Exercitation sunt laboris duis amet quis et nisi consectetur consequat aliquip sit. Et quis ipsum do aliqua tempor aliquip reprehenderit irure occaecat."'
  },
  {
    author: 'Alice Johnson',
    position: 'Dr. at ABC Hospital',
    testimonial:
      '"Minim velit voluptate officia eiusmod nostrud. Aute consectetur elit nisi adipisicing fugiat laborum ipsum anim et cillum non. Proident nostrud in sit occaecat et."'
  },
  {
    author: 'Jane Doe',
    position: 'CEO at ABC Inc',
    testimonial:
      '"Laborum pariatur ea commodo Lorem ut nulla eiusmod mollit tempor cillum nulla proident Lorem non. Sint commodo occaecat dolore pariatur minim. Et voluptate ullamco ipsum ut in laboris veniam in magna excepteur aute enim Lorem. Reprehenderit mollit Lorem qui anim et ut pariatur dolore dolor magna eu. Do duis amet ea ad reprehenderit enim sunt consequat velit culpa velit amet anim non. Culpa enim aliquip ex est ex qui incididunt mollit sit aute exercitation. Irure aliqua Lorem veniam duis."'
  }
] as const;

const TestimonialsSection = () => {
  const t = useTranslations('landing_page');
  const [currentSelectedIndex, setCurrentSelectedIndex] = useState(0);

  const visibileIndexes = [
    getPreviousIndex(currentSelectedIndex, testimonials.length),
    currentSelectedIndex,
    getNextIndex(currentSelectedIndex, testimonials.length)
  ];

  const visibleTestimonials = visibileIndexes.map((index) => testimonials[index]);

  const handleNext = () => {
    setCurrentSelectedIndex((prev) => getNextIndex(prev, testimonials.length));
  };

  const handlePrevious = () => {
    setCurrentSelectedIndex((prev) => getPreviousIndex(prev, testimonials.length));
  };

  return (
    <section className="flex flex-col gap-y-14">
      <SectionTitle
        title={t('testimonials__title')}
        subtitle={t.rich('testimonials__subtitle', { br: () => <br /> })}
      />

      <div className="flex flex-col items-center gap-y-28 overflow-hidden rounded-3xl bg-white pb-16 pt-20">
        <div className="flex items-stretch justify-center gap-x-16 text-secondary-foreground">
          {visibleTestimonials.map(({ author, position, testimonial }, index) => (
            <div
              key={author}
              className={cn('hidden lg:block w-5/6 md:w-[36rem] shrink-0 space-y-3', index === 1 && 'block')}
            >
              <div className="relative mb-10 h-60 rounded-3xl">
                <div className="relative z-10 flex h-full rounded-3xl bg-[#E28431] p-10">
                  <p className="my-auto line-clamp-6">{testimonial}</p>
                </div>
                <div className="absolute -bottom-5 left-10 size-10 rotate-45 bg-[#E28431]"></div>
              </div>

              <div className="ml-4 flex flex-col md:ml-14">
                <p className="font-semibold">{author}</p>
                <p>{position}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex w-5/6 items-center justify-between md:w-[36rem]">
          <button onClick={handlePrevious}>
            <ArrowLeftIcon className="size-8 text-gray-300" />
          </button>

          <div className="flex justify-center gap-x-4">
            {[...Array(testimonials.length).keys()].map((index) => (
              <StarFilledIcon
                key={index}
                className={cn('size-5', currentSelectedIndex === index ? 'text-[#E28431]' : 'text-gray-300')}
              />
            ))}
          </div>
          <button onClick={handleNext}>
            <ArrowRightIcon className="size-8 text-gray-300" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

const getPreviousIndex = (currentIndex: number, totalLength: number) => {
  return currentIndex === 0 ? totalLength - 1 : currentIndex - 1;
};

const getNextIndex = (currentIndex: number, totalLength: number) => {
  return currentIndex === totalLength - 1 ? 0 : currentIndex + 1;
};
