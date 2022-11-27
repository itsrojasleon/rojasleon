import Link from 'next/link';
import { Project } from '../pages/portfolio/index';
import Text from './Text';

const Card: React.FC<Project> = ({
  title,
  route,
  image,
  description,
  languages,
  github,
  website
}) => {
  return (
    <div className="bg-white dark:bg-black rounded overflow-hidden shadow-lg mb-6 flex flex-col">
      <Link href="/portfolio/[slug]" as={`/portfolio/${route}`}>
        <>
          <img className="w-full" src={image} />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{title}</div>
            <Text>{description}</Text>
          </div>
        </>
      </Link>
      <div className="px-6 py-4 flex flex-wrap items-center justify-between flex-grow">
        <a href={github} target="_blank">
          <button className="py-1 px-4 border border-transparent font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-700 transition-all">
            Code
          </button>
        </a>
        {website && (
          <a href={website} target="_blank">
            <button className="py-1 px-4 border border-transparent font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-700 transition-all">
              Preview
            </button>
          </a>
        )}
      </div>
      <div className="px-6 py-4 mt-3 border-t dark:border-gray-800 flex-1">
        {languages.map((lan) => (
          <span
            key={lan}
            className="border border-black hover:bg-gray-700 hover:text-white dark:border-gray-600 dark:hover:bg-white dark:hover:text-black rounded-full px-3 py-2 mr-3 text-sm font-semibold cursor-pointer">
            {lan}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Card;
