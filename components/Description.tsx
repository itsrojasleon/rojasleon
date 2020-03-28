import React from 'react';

interface Props {
  job?: string;
  children: React.ReactNode;
}

const Description = ({ job, children }: Props) => {
  return (
    <>
      <h2 className="text-xl font-light text-gray-600">{job}</h2>
      <p className="leading-relaxed text-xl text-gray-600 font-light">
        {children}
      </p>
    </>
  );
};

export default Description;
