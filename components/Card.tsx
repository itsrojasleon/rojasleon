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
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-md transition duration-500 ease-in-out">
            <span>Code</span>
          </button>
        </a>
        {website && (
          <a href={website} target="_blank">
            <button className="bg-orange-200 hover:bg-orange-300 text-orange-500 font-semibold py-2 px-4 rounded-md transition duration-500 ease-in-out">
              <span>Preview</span>
            </button>
          </a>
        )}
      </div>
      <div className="px-6 py-4">
        {languages.map((lan) => (
          <span
            key={lan}
            className="inline-block text-gray-700 bg-gray-200 rounded-full px-3 py-1 mr-3 text-sm italic">
            {lan}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Card;
