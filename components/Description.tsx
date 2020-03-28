import React from 'react';

interface Props {
  description: string;
  job?: string;
}

const Description = ({ description, job }: Props) => {
  return (
    <>
      <h2 className="mb-8 text-2xl font-medium">{job}</h2>
      <p className="text-xl text-gray-600 font-light">{description}</p>
    </>
  );
};

export default Description;
