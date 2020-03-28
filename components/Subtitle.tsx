import React from 'react';

interface Props {
  subtitle: string;
  icon?: string;
}

const Subtitle = ({ subtitle, icon }: Props) => {
  return (
    <h1 className="text-4xl font-medium">
      {subtitle} {icon}
    </h1>
  );
};

export default Subtitle;
