import React from 'react';
import Link from 'next/link';
import { Project } from '../pages/portfolio/index';

const Card = ({
  title,
  route,
  image,
  description,
  languages,
  github,
  website
}: Project) => {
  return (
    <div className=" rounded overflow-hidden shadow mb-6">
      <Link href="/portfolio/[slug]" as={`/portfolio/${route}`}>
        <a>
          <img className="w-full" src={image} />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{title}</div>
            <p className="text-gray-700 font-light text-base">{description}</p>
          </div>
        </a>
      </Link>
      <div className="px-6 py-4 flex flex-wrap items-center justify-between">
        <a href={github} target="_blank">
          <button className="py-2 px-4 border border-transparent font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <span>Code</span>
          </button>
        </a>
        {website && (
          <a href={website} target="_blank">
            <button className="py-2 px-4 border border-transparent font-medium rounded-md text-indigo-600 bg-indigo-200 hover:bg-indigo-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <span>Preview</span>
            </button>
          </a>
        )}
      </div>
      <div className="px-6 py-4 mt-3">
        {languages.map((lan) => (
          <span
            key={lan}
            className="inline-block text-black border border-black hover:bg-gray-700 hover:text-white rounded-full px-3 py-2 mr-3 text-sm font-semibold">
            {lan}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Card;
