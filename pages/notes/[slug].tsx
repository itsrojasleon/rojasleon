import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { getResource, getPaths, Resources } from '../../utils/resources';

const Note = ({ htmlString, data }) => {
  return (
    <div>
      <Head>
        <title>{data.title} - rojasleon</title>
        <meta title="description" content={data.description} />
      </Head>
      <div className="prose m-auto w-auto lg:w-8/12">
        <div dangerouslySetInnerHTML={{ __html: htmlString }} />
      </div>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getPaths(Resources.Notes);

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async ({ params: { slug } }) => {
  const { htmlString, parsedMarkdown } = getResource(Resources.Notes, slug);

  return {
    props: {
      htmlString,
      data: parsedMarkdown.data
    }
  };
};

export default Note;
