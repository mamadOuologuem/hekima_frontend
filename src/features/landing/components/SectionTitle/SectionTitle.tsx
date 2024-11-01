import React from 'react';

interface SectionTitleProps {
  title: string;
  subtitle: React.ReactNode;
}

const SectionTitle = ({ title, subtitle }: SectionTitleProps) => {
  return (
    <div className="flex flex-col items-center gap-x-16 gap-y-6 text-center md:flex-row md:items-start md:text-left">
      <h2 className="w-fit p-1 highlighted-text-secondary">{title}</h2>
      <p className="[&_br]:hidden md:[&_br]:block">{subtitle}</p>
    </div>
  );
};

export default SectionTitle;
