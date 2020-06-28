import React from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Subtitle from '../../components/Subtitle';
import Card from '../../components/Card';
import { getResources, Resources } from '../../utils/resources';

export interface Project {
  title: string;
  description: string;
  route: string;
  image: string;
  languages: string[];
  github: string;
  website: string;
}

interface Props {
  projects: Project[];
}

const Portfolio = ({ projects }: Props) => {
  return (
    <>
      <Head>
        <title>Portfolio | rojasleon</title>
      </Head>
      <Subtitle subtitle="Portfolio" />
      <div className="m-auto grid gap-4 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-2">
        {projects.map((info) => (
          <Card key={info.title} {...info} />
        ))}
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const projects = getResources(Resources.Projects);

  return {
    props: {
      projects
    }
  };
};

export default Portfolio;
