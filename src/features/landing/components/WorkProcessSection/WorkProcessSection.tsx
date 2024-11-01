'use client';

import { PlusIcon, MinusIcon } from '@radix-ui/react-icons';
import SectionTitle from '@/features/landing/components/SectionTitle';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const processes = [
  {
    title: 'Consultation',
    description:
      'During the initial consultation, we will discuss your business goals and objectives, target audience, and current marketing efforts. This will allow us to understand your needs and tailor our services to best fit your requirements.'
  },
  {
    title: 'Research and Strategy Development',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, quaerat, eum error sunt, eligendi voluptatum iure quod odio non ut quas culpa dolorem illum ad quasi adipisci ab hic commodi.'
  },
  {
    title: 'Implementation',
    description:
      'Cillum velit qui anim amet officia. Veniam proident et id exercitation sunt do. Eu mollit ullamco occaecat id nisi anim.'
  },
  {
    title: 'Monitoring and Optimization',
    description:
      'Laborum sint labore dolor enim sit voluptate nulla occaecat amet labore esse. Magna cupidatat dolore laborum sunt nulla laboris. Consequat deserunt cillum laborum cillum ipsum minim ipsum.'
  },
  {
    title: 'Reporting and Communication',
    description:
      'Laboris exercitation eu ullamco magna qui labore. Velit reprehenderit eu proident commodo. Pariatur cupidatat cupidatat veniam exercitation qui voluptate in eiusmod minim mollit. Incididunt cupidatat quis reprehenderit nulla deserunt mollit sint. Irure ea veniam qui aute reprehenderit sunt eu ea. Velit tempor culpa minim excepteur.'
  },
  {
    title: 'Continual Improvement',
    description:
      'Proident veniam in ad non aliqua excepteur. Non aliqua aliqua quis velit. Nostrud elit est aute nulla eu reprehenderit occaecat. Ex dolor elit labore eu dolor nisi nisi officia. Tempor occaecat aliquip eiusmod ullamco ut sint aliqua occaecat proident consectetur eu. Quis voluptate anim irure in officia tempor non non sunt ex aute ipsum magna. Reprehenderit enim laboris aliquip laboris esse ea magna anim velit eu commodo enim quis.'
  }
] as const;

const WorkProcessSection = () => {
  const [openedStepIndex, setOpenedStepIndex] = useState(0);

  return (
    <section className="flex flex-col gap-y-14">
      <SectionTitle
        title="Our Working Process "
        subtitle={
          <>
            Step-by-Step Guide to Achieving
            <br />
            Your Business Goals
          </>
        }
      />

      <div className="flex flex-col gap-y-10">
        {processes.map(({ title, description }, index) => (
          <button key={title} onClick={() => setOpenedStepIndex(index)}>
            <div
              className={cn(
                'duration-200 relative flex flex-col gap-y-10 rounded-3xl border border-muted-foreground bg-muted p-12 text-left',
                openedStepIndex === index && 'bg-secondary'
              )}
            >
              <div className="absolute left-0 top-1.5 -z-10 size-full rounded-3xl bg-black" />
              <div className="flex justify-between">
                <div className="flex items-center gap-x-4">
                  <p className="text-6xl">
                    {(index + 1).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}
                  </p>
                  <h3>{title}</h3>
                </div>
                <div className={cn('size-fit rounded-full bg-muted border border-black p-2')}>
                  {openedStepIndex === index ? (
                    <MinusIcon width={25} height={25} />
                  ) : (
                    <PlusIcon width={25} height={25} />
                  )}
                </div>
              </div>
              <div className={cn('hidden flex-col gap-y-10', openedStepIndex === index && 'flex')}>
                <hr className="h-0.5 bg-black" />
                <p>{description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};

export default WorkProcessSection;
