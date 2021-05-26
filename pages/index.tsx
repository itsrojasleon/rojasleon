import React from 'react';
import Head from 'next/head';
import Subtitle from '../components/Subtitle';
import Description from '../components/Description';

const Home = () => {
  const renderLinks = () => {
    const links = [
      { href: 'https://github.com/rojasleon', label: 'Github' },
      { href: 'https://codesandbox.io/u/rojasleon', label: 'Codesandbox' },
      { href: 'https://glitch.com/@rojasleon', label: 'Glitch' },
      { href: 'https://www.codewars.com/users/rojasleon', label: 'Codewars' },
      { href: 'https://www.hackerrank.com/rojasleon', label: 'Hackerrank' },
      { href: 'https://platzi.com/p/rojasleon', label: 'Platzi' }
    ];

    return links.map(({ href, label }, i) => {
      return (
        <a key={href} href={href} target="_blank">
          <span className="font-medium hover:underline transition duration-150 ease-in-out">
            {label}
          </span>
          <span className="text-gray-700 dark:text-white">
            {i === links.length - 1 ? '' : ', '}
          </span>
        </a>
      );
    });
  };

  const renderLangs = () => {
    const langs = [
      'Javascript',
      'Typescript',
      'Go',
      'React',
      'Node',
      'Docker',
      'Kubernetes',
      'Etc.'
    ];

    return (
      <ul className="list-disc">
        {langs.map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>
    );
  };

  return (
    <>
      <Head>
        <title>Home - rojasleon</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
        <Subtitle subtitle="Hi, I'm Luis!" />
        <Description job="Full Stack Developer">
          I pretty much do Web Development with the following programming
          languages and technologies: {renderLangs()}I would like to learn more
          about the Cloud, Machine Learning and Ethereum; I know it can be tough
          but I'm sure I can deal with that. Please visit my {renderLinks()} to
          see what I'm doing right now.
        </Description>
      </>
    </>
  );
};

export default Home;
