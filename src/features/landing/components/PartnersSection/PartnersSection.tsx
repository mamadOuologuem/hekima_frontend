import Image from 'next/image';

const partners = [
  { name: 'Amazon', image: '/landing/partners/amazon.png' },
  { name: 'Dribbble', image: '/landing/partners/dribbble.png' },
  { name: 'HubSpot', image: '/landing/partners/hubspot.png' },
  { name: 'Netflix', image: '/landing/partners/netflix.png' },
  { name: 'Notion', image: '/landing/partners/notion.png' },
  { name: 'Zoom', image: '/landing/partners/zoom.png' }
] as const;

const PartnersSection = () => {
  return (
    <section className="grid grid-cols-2 gap-20 md:grid-cols-6">
      {partners.map((partner) => (
        <Image
          key={partner.name}
          src={partner.image}
          alt={partner.name}
          width={100}
          height={100}
          className="mx-auto grayscale hover:grayscale-0"
        />
      ))}
    </section>
  );
};

export default PartnersSection;
