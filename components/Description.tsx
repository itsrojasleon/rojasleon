import React from 'react';

interface Props {
  job?: string;
  children: React.ReactNode;
}

const Description = ({ job, children }: Props) => {
  return (
    <>
      <h2 className="text-2xl font-light text-gray-900">{job}</h2>
      <p className="leading-relaxed text-xl text-gray-600 font-light text-justify">
        {children}
      </p>
    </>
  );
};

export default Description;
