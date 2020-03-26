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
  image: string;
  languages: string[];
  github: string;
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
        <div className="flex flex-wrap items-center justify-between">
          {data.map(info => (
            <div
              className="max-w-sm rounded overflow-hidden shadow-lg"
              key={info.title}>
              <img className="w-full" src={info.image} />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{info.title}</div>
                <p className="text-gray-700 text-base">{info.description}</p>
              </div>
              <div className="px-6 py-4">
                <a href={info.github} target="_blank">
                  <button className="bg-white hover:bg-gray-100 text-gray-600 py-2 px-4 border border-gray-400 rounded transform scale-90">
                    <i className="hover:text-gray-700 text-xl fab fa-github cursor-pointer w-4 h-4 mr-3"></i>
                    <span>Code</span>
                  </button>
                </a>
              </div>
              <div className="px-6 py-4">
                {info.languages.map(lan => (
                  <span
                    key={lan}
                    className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-medium text-gray-700">
                    {lan}
                  </span>
                ))}
              </div>
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
