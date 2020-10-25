import React from 'react';
import Head from 'next/head';
import Subtitle from '../components/Subtitle';
import Description from '../components/Description';

const About = () => {
  return (
    <>
      <Head>
        <title>About - rojasleon</title>
      </Head>
      <Subtitle subtitle="Hello again!" />
      <Description>
        <>
          My name's Juan Luis Rojas León. When I was 15 years old I discovered
          this incredible world of programming, after that I knew what my life
          purpose was going to be. I started programming with Java and PHP but
          it was a headache for me, then I switched to Javascript (I loved it, I
          wish I had started with than language... or another one like Python)
          and I'm still using it in my projects with Typescript. I have a little
          of experience with Python, c++ and swift but just the enough knowledge
          to "play" with them: small apps and data structures | algorithm
          problems.
        </>
      </Description>
    </>
  );
};

export default About;
