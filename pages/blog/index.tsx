import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
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

const Blog: React.FC<Props> = ({ posts }) => (
  <>
    <Head>
      <title>Blog - rojasleon</title>
    </Head>
    <Subtitle subtitle="Blog" />
    <ul className="list-disc">
      {posts.map((post) => (
        <li key={post.title} className="flex items-center gap-3">
          <Link
            href="/blog/[slug]"
            as={`/blog/${post.route}`}
            className="text-xl hover:underline">
            {post.title}
          </Link>
          <span className="font-light dark:text-gray-300 antialiased">
            {post.date}
          </span>
        </li>
      ))}
    </ul>
  </>
);

export const getStaticProps: GetStaticProps = async () => {
  const posts: Blog[] = getResources(Resources.Posts);

  return {
    props: {
      posts: posts.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      })
    }
  };
};

export default Blog;
