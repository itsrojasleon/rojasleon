import React from 'react';
import Head from 'next/head';
import Subtitle from '../components/Subtitle';
import Description from '../components/Description';

const Home = () => {
  const links = [
    { href: 'https://github.com/rojasleon', label: 'Github' },
    { href: 'https://codesandbox.io/u/rojasleon', label: 'Codesandbox' },
    { href: 'https://glitch.com/@rojasleon', label: 'Glitch' },
    { href: 'https://www.codewars.com/users/rojasleon', label: 'Codewars' },
    { href: 'https://www.hackerrank.com/rojasleon', label: 'Hackerrank' }
  ].map(({ href, label }, idx) => {
    let separator;

    if (idx !== 4) {
      separator = ', ';
    }
    if (idx === 3) {
      separator = ' or ';
    }
    return (
      <a
        key={idx}
        className="text-blue-600 font-medium hover:underline"
        href={href}
        target="_blank">
        {label}
        {separator}
      </a>
    );
  });

  return (
    <>
      <Head>
        <title>Home - rojasleon</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
        <Subtitle subtitle="Hi, I'm Luis!" />
        <Description job="I'm a software developer.">
          Right now I'm using React, Node, Typescript, MongoDB/Postgres, Docker
          and Kubernetes to develop apps. I'm learning about the cloud and I
          really would like to learn about ethereum and self driving cars... I
          know, it's hard, but I'm pretty sure I can deal with that. Please
          visit my {links} to see what I'm doing right now.
        </Description>
      </>
    </>
  );
};

export default Home;
