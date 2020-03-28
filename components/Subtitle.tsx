import React from 'react';

interface Props {
  subtitle: string;
  icon?: string;
}

const Subtitle = ({ subtitle, icon }: Props) => {
  return (
    <h1 className="mb-8 text-4xl font-bold">
      {subtitle} {icon}
    </h1>
  );
};

export default Subtitle;
