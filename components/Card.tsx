import React from 'react';
import Link from 'next/link';
import { IPortfolio } from '../interfaces/Portfolio';

const Card = ({
  title,
  route,
  image,
  description,
  languages,
  github,
  website
}: IPortfolio) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <Link href={`/portfolio/${route}`}>
        <a>
          <img className="w-full" src={image} />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{title}</div>
            <p className="text-gray-700 text-base">{description}</p>
          </div>
        </a>
      </Link>
      <div className="px-6 py-4 flex flex-wrap items-center justify-between">
        <a href={github} target="_blank">
          <button className="bg-white hover:bg-gray-100 text-gray-600 py-2 px-4 border border-gray-400 rounded transform scale-90">
            <i className="hover:text-gray-700 text-xl fab fa-github cursor-pointer w-4 h-4 mr-3"></i>
            <span>Code</span>
          </button>
        </a>
        <a href={website} target="_blank">
          <button className="bg-white hover:bg-gray-100 text-gray-600 py-2 px-4 border border-gray-400 rounded transform scale-90">
            <i className="hover:text-gray-700 text-xl fas fa-search cursor-pointer w-4 h-4 mr-3"></i>
            <span>Preview</span>
          </button>
        </a>
      </div>
      <div className="px-6 py-4">
        {languages.map(lan => (
          <span
            key={lan}
            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-medium text-gray-700">
            {lan}
          </span>
        ))}
      </div>
    </div>
  );
};
export default Card;
