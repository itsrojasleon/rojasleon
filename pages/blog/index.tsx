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
  date: string;
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
      {posts.map((post) => (
        <li key={post.title}>
          <Link href="/blog/[slug]" as={`/blog/${post.route}`}>
            <a className="text-xl hover:underline">{post.title}</a>
          </Link>
          <span className="text-gray-600 ml-2 font-light">{post.date}</span>
        </li>
      ))}
    </ul>
  </>
);

export const getStaticProps: GetStaticProps = async () => {
  const posts: Blog[] = getResources(Resources.Posts);

  return {
    props: {
      posts: posts.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      )
    }
  };
};

export default Blog;
