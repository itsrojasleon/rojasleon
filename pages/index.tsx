import React from 'react';
import Head from 'next/head';
import Subtitle from '../components/Subtitle';
import Description from '../components/Description';

const Home = () => {
  const renderLinks = () => {
    const links = [
      { href: 'https://github.com/rojasleon', label: 'Github' },
      {
        href: 'https://www.youtube.com/channel/UCMmSIbY7b5S1ayAiqD8jt_g',
        label: 'Youtube Channel'
      }
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
      'React Native',
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
          I pretty much do Web and Mobile Development and with the following
          programming languages and technologies: {renderLangs()}I would like to
          be part of a project where I can build, manage, and scale it. <br />{' '}
          I'm super interested in continue learning about web technologies (for
          exmaple web3 is a hot topic right now, don't you think?), AI, Frontend
          tools, and more programming languages.
          <br />
          Please visit my {renderLinks()} to see what I'm doing right now.
        </Description>
      </>
    </>
  );
};

export default Home;
