import React from 'react';
import Head from 'next/head';
import Subtitle from '../components/Subtitle';
import Description from '../components/Description';

const Home = () => (
  <>
    <Head>
      <title>Home | rojasleon</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <>
      <Subtitle subtitle="Hello, I'm Luis!" />
      <Description job="~ Software Developer (Javascript and Typescript).">
        I'm constantly learning new things about this world (most of the time
        I'm reading and writing code, but it is also important improve as a
        person). Please visit my{' '}
        <a
          className="text-blue-600"
          href="https://github.com/rojasleon"
          target="_blank">
          Github
        </a>{' '}
        ||{' '}
        <a
          className="text-blue-600"
          href="https://codesandbox.io/u/rojasleon"
          target="_blank">
          Codesandbox
        </a>{' '}
        ||{' '}
        <a
          className="text-blue-600"
          href="https://glitch.com/@rojasleon"
          target="_blank">
          Glitch
        </a>{' '}
        ||{' '}
        <a
          className="text-blue-600"
          href="https://www.codewars.com/users/rojasleon"
          target="_blank">
          Codewars
        </a>{' '}
        or{' '}
        <a
          className="text-blue-600"
          href="https://www.hackerrank.com/rojasleon"
          target="_blank">
          Hackerrank
        </a>{' '}
        to see what I'm doing right now.
      </Description>
    </>
  </>
);

export default Home;
// xl:w-8/12
