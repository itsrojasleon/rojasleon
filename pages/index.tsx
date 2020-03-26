import React from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import Subtitle from '../components/Subtitle';

const Home = () => (
  <>
    <Head>
      <title>Home | rojasleon</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Layout>
      <Subtitle subtitle="Hello there" />
    </Layout>
  </>
);

export default Home;
