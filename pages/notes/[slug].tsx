import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { getPaths, getResource, Resources } from '../../utils/resources';

const Note = ({ htmlString, data }) => {
  return (
    <div>
      <Head>
        <title>{data.title} - rojasleon</title>
        <meta title="description" content={data.description} />
      </Head>
      <div className="prose dark:prose-light m-auto">
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
