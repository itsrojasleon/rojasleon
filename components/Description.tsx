import React from 'react';

interface Props {
  job?: string;
  children: React.ReactNode;
}

const Description = ({ job, children }: Props) => {
  return (
    <>
      <h2 className="text-2xl text-black mb-3">{job}</h2>
      <p className="leading-relaxed text-xl text-gray-600 font-light">
        {children}
      </p>
    </>
  );
};

export default Description;
