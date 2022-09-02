import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { getPaths, getResource, Resources } from '../../utils/resources';

const Post = ({ htmlString, data }) => {
  console.log(data);

  return (
    <>
      <Head>
        <title>{data.title} - rojasleon</title>
        <meta title="description" content={data.description} />
      </Head>
      <div className="prose dark:prose-invert prose-md m-auto prose-code:after:content-none prose-code:before:content-none prose-code:p-1 prose-code:rounded-md">
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
