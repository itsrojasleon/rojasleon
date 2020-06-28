import React from 'react';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import Subtitle from '../../components/Subtitle';
import { getResources, Resources } from '../../utils/resources';

interface Blog {
  title: string;
  description: string;
  route: string;
}

interface Props {
  posts: Blog[];
}

const Blog = ({ posts }: Props) => (
  <>
    <Head>
      <title>Blog | rojasleon</title>
    </Head>
    <Subtitle subtitle="Blog" />
    <ul className="list-disc">
      {posts.map((info) => (
        <li key={info.title}>
          <Link href="/blog/[slug]" as={`/blog/${info.route}`}>
            <a className="hover:underline text-xl">{info.title}</a>
          </Link>
        </li>
      ))}
    </ul>
  </>
);

export const getStaticProps: GetStaticProps = async () => {
  const posts = getResources(Resources.Posts);

  return {
    props: {
      posts
    }
  };
};

export default Blog;
