import React from 'react';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import Head from 'next/head';
import { GetStaticPaths, GetStaticProps } from 'next';
import Layout from '../components/Layout';
import matter from 'gray-matter';

interface IBlog {
  title: string;
  description: string;
  route: string;
}

interface Props {
  data: IBlog[];
}

const Blog = ({ data }: Props) => {
  return (
    <>
      <Head>
        <title>Blog | rojasleon</title>
      </Head>
      <Layout>
        <div>
          {data.map(info => (
            <div key={info.title}>
              <Link href={`/blog/${info.route}`}>
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
  const files = fs.readdirSync('posts');
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
  const files = fs.readdirSync('posts');
  const metadata = [];

  for (let file of files) {
    const singleFile = fs.readFileSync(path.join('posts', file)).toString();
    const parsedMarkdown = matter(singleFile);
    // file.replace('.md', '')
    metadata.push({ ...parsedMarkdown.data, route: file.replace('.md', '') });
  }

  return {
    props: {
      data: metadata
    }
  };
};

export default Blog;
