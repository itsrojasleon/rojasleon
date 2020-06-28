import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { getResource, getPaths, Resources } from '../../utils/resources';

const Post = ({ htmlString, data }) => {
  return (
    <>
      <Head>
        <title>{data.title}</title>
        <meta title="description" content={data.description} />
      </Head>
      <div className="markdown m-auto w-auto lg:w-8/12">
        <div dangerouslySetInnerHTML={{ __html: htmlString }} />
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getPaths(Resources.Posts);

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async ({ params: { slug } }) => {
  const { htmlString, parsedMarkdown } = getResource(Resources.Posts, slug);

  return {
    props: {
      htmlString,
      data: parsedMarkdown.data
    }
  };
};

export default Post;
