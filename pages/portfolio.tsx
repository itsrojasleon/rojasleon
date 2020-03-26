import React from 'react';
import fs from 'fs';
import path from 'path';
import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import Layout from '../components/Layout';
import matter from 'gray-matter';
import Subtitle from '../components/Subtitle';

interface IPortfolio {
  title: string;
  description: string;
  route: string;
}

interface Props {
  data: IPortfolio[];
}

const Portfolio = ({ data }: Props) => {
  return (
    <>
      <Head>
        <title>Portfolio | rojasleon</title>
      </Head>
      <Layout>
        <Subtitle subtitle="Portfolio" />
        <div>
          {data.map(info => (
            <div key={info.title}>
              <Link href={`/portfolio/${info.route}`}>
                <a>{info.title}</a>
              </Link>
            </div>
          ))}
        </div>
      </Layout>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const files = fs.readdirSync('projects');
  const paths = files.map(filename => ({
    params: {
      slug: filename.replace('.md', '')
    }
  }));

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async () => {
  const files = fs.readdirSync('projects');
  const metadata = [];

  for (let file of files) {
    const singleFile = fs.readFileSync(path.join('projects', file)).toString();
    const parsedMarkdown = matter(singleFile);
    metadata.push({ ...parsedMarkdown.data, route: file.replace('.md', '') });
  }

  return {
    props: {
      data: metadata
    }
  };
};

export default Portfolio;
