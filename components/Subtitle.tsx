import React from 'react';

interface Props {
  subtitle: string;
}

const Subtitle = ({ subtitle }: Props) => {
  return <h1 className="text-4xl">{subtitle}</h1>;
};

export default Subtitle;
