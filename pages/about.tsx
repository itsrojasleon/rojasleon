import React from 'react';
import Head from 'next/head';
import Subtitle from '../components/Subtitle';
import Description from '../components/Description';
import Text from '../components/Text';

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
          wish I had started with than language or another one like Python) and
          I'm still using it in my projects with Typescript. I've been playing
          around a couple of different programming languages, one of them is Go.
          I feel confident writing Node code but I just wanted to do things a
          bit different, I wanted to have more options when writing backend code
          and of course more job opportunities; that's why I tried Go. And I'm
          100% sure that this text will change in the coming months or years
          because I'm always in "learning mode" and you should too.
          <Text className="mt-3">See you on the internet! 😊</Text>
        </>
      </Description>
    </>
  );
};

export default About;
