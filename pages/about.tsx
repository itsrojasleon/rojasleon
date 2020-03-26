import React from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import Subtitle from '../components/Subtitle';

const About = () => {
  return (
    <>
      <Head>
        <title>About | rojasleon</title>
      </Head>
      <Layout>
        <Subtitle subtitle="Hey again" />
      </Layout>
    </>
  );
};
export default About;
