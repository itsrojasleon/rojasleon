import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { getResource, getPaths, Resources } from '../../utils/resources';

const Project = ({ htmlString, data }) => {
  return (
    <div>
      <Head>
        <title>{data.title} | rojasleon</title>
        <meta title="description" content={data.description} />
      </Head>
      <div className="markdown">
        <div dangerouslySetInnerHTML={{ __html: htmlString }} />
      </div>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getPaths(Resources.Projects);

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async ({ params: { slug } }) => {
  const { htmlString, parsedMarkdown } = getResource(Resources.Projects, slug);

  return {
    props: {
      htmlString,
      data: parsedMarkdown.data
    }
  };
};

export default Project;
