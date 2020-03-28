import React from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import Subtitle from '../components/Subtitle';
import Description from '../components/Description';

const Home = () => (
  <>
    <Head>
      <title>Home | rojasleon</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Layout>
      <div className=" flex justify-center flex-col">
        <Subtitle subtitle="Hello, I'm Luis Rojas!" icon="👋" />
        <Description
          job="Software Developer (Javascript, Typescript and I can write a little bit of Python and Go code)"
          description="I'm constantly learning new things about this world (most of the time I'm reading and writing code, but it is also important improve as a person)"
        />
      </div>
    </Layout>
  </>
);

export default Home;
// xl:w-8/12
