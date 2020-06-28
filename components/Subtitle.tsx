import React from 'react';

interface Props {
  subtitle: string;
  icon?: string;
}

const Subtitle = ({ subtitle, icon }: Props) => (
  <h1 className="mb-8 text-4xl font-semibold font-sans">
    {subtitle} {icon}
  </h1>
);

export default Subtitle;
