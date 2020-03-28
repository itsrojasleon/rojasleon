import React from 'react';

interface Props {
  job?: string;
  children: React.ReactNode;
}

const Description = ({ job, children }: Props) => {
  return (
    <>
      <h2 className="text-xl font-light text-gray-600">{job}</h2>
      <p className="leading-relaxed text-xl text-gray-500 font-light text-justify">
        {children}
      </p>
    </>
  );
};

export default Description;
