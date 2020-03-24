import React from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';

const Home = () => (
  <>
    <Head>
      <title>Home | rojasleon</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Layout>
      <h1>Hello there</h1>
    </Layout>
  </>
);

export default Home;
