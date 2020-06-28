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
          <button className="bg-transparent hover:bg-black text-black-700 font-semibold hover:text-white py-2 px-4 border border-black-800 hover:border-transparent rounded">
            <i className="text-xl fab fa-github cursor-pointer w-4 h-4 mr-3"></i>
            <span>Code</span>
          </button>
        </a>
        <a href={website} target="_blank">
          <button className="bg-transparent hover:bg-black text-black-700 font-semibold hover:text-white py-2 px-4 border border-black-800 hover:border-transparent rounded">
            <i className="text-xl fas fa-search cursor-pointer w-4 h-4 mr-3"></i>
            <span>Preview</span>
          </button>
        </a>
      </div>
      <div className="px-6 py-4">
        {languages.map((lan) => (
          <span
            key={lan}
            className="inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-medium text-blue-800">
            {lan}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Card;
