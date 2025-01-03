'use client';

import { StarFilledIcon, ArrowRightIcon, ArrowLeftIcon } from '@radix-ui/react-icons';
import SectionTitle from '@/features/landing/components/SectionTitle';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

const testimonials = [
  {
    author: 'Aminata Diallo',
    location: 'Bamako',
    testimonial:
      'Hekima m’a énormément aidée à gérer mes tâches quotidiennes. Je peux obtenir des réponses rapides en français, ou même en bambara. C’est comme avoir un assistant personnel disponible 24h/24 et 7j/7. Une vraie révolution pour nous ici à Bamako !'
  },
  {
    author: 'Ibrahima Coulibaly',
    location: 'Ségou',
    testimonial:
      'Grâce à Hekima, je peux accéder à des informations sur les opportunités d’emploi et des conseils agricoles adaptés à notre région. Cela fait une vraie différence pour ma famille et moi, surtout dans notre village de Ségou. Bravo !'
  },
  {
    author: 'Fatoumata Traoré',
    location: 'Kayes',
    testimonial:
      'Ce que j’aime le plus avec Hekima, c’est qu’il comprend nos besoins locaux. Que ce soit pour l’éducation de mes enfants ou des informations pratiques sur la santé, je trouve toujours des réponses fiables. Merci pour cette application, c’est vraiment utile pour les femmes comme moi.'
  },
  {
    author: 'Mamadou Diarra',
    location: 'Sikasso',
    testimonial:
      'Hekima a rendu mes recherches d’informations rapides et efficaces. Avant, je perdais beaucoup de temps à chercher sur Internet. Maintenant, je peux poser mes questions en bambara et obtenir des réponses claires. L’interface est tellement simple à utiliser, même pour les non-initiés.'
  },
  {
    author: 'Salif Keita',
    location: 'Koutiala',
    testimonial:
      'Avec Hekima, je me sens connecté au monde tout en restant enraciné dans ma culture. L’intelligence artificielle au service de l’Afrique, c’est exactement ce qu’il nous faut pour avancer.'
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
          {visibleTestimonials.map(({ author, location, testimonial }, index) => (
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
                <p>{location}</p>
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
