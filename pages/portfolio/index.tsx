import React from 'react';
import fs from 'fs';
import path from 'path';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import matter from 'gray-matter';
import Subtitle from '../../components/Subtitle';
import Card from '../../components/Card';
import { IPortfolio } from '../../interfaces/Portfolio';

interface Props {
  data: IPortfolio[];
}

const Portfolio = ({ data }: Props) => {
  return (
    <>
      <Head>
        <title>Portfolio | rojasleon</title>
      </Head>
      <Subtitle subtitle="Portfolio" />
      <h2 className="text-3xl mb-10">More projects coming soon...</h2>
      <div className="m-auto grid gap-4 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-2">
        {data.map((info) => (
          <Card key={info.title} {...info} />
        ))}
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const files = fs.readdirSync('projects');
  const paths = files.map((filename) => ({
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
