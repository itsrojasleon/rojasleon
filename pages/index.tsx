import Head from 'next/head';
import Description from '../components/Description';
import Subtitle from '../components/Subtitle';

const Home = () => {
  const renderLinks = () => {
    const links = [
      { href: 'https://github.com/rojasleon', label: 'Github' },
      {
        href: 'https://www.youtube.com/channel/UCMmSIbY7b5S1ayAiqD8jt_g',
        label: 'Youtube Channel'
      }
    ];

    return links.map(({ href, label }, i) => {
      return (
        <a key={href} href={href} target="_blank">
          <span className="font-medium hover:underline transition duration-150 ease-in-out">
            {label}
          </span>
          <span className="text-gray-700 dark:text-white">
            {i === links.length - 1 ? '' : ' | '}
          </span>
        </a>
      );
    });
  };

  const renderLangs = () => {
    const langs = [
      'NodeJS - Typescript',
      'React | React Native - Typescript',
      'AWS',
      'Serverless',
      'CDK',
      'Docker'
    ];

    return (
      <ul className="list-disc">
        {langs.map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>
    );
  };

  return (
    <>
      <Head>
        <title>Home - rojasleon</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Subtitle subtitle="Hi, I'm Juan!" />
        <Description job="Full stack developer">
          I primarily focus on frontend and backend development, utilizing the
          following programming languages and technologies: {renderLangs()}
          <br />
          I'd like to be part of a team that is working on a product that is
          amazing and that is helping people to solve their problems, now I'm in
          a great team creating electronic invoicing solutions for Latin America
          at scale.
          <br />
          I'm always looking for new challenges that push me really hard to
          learn new things and to improve my skills. Also a funny fact about me
          is that I love learning new cultures, new slang words and new
          languages. So If you have some super-local-hood words or phrases,
          please let me know 😝!
          <br />
          Please visit my {renderLinks()} to see what I'm doing right now or ask
          me directly on{' '}
          <a
            className="hover:cursor-pointer font-semibold"
            href="https://x.com/rojas_leon_">
            Twitter
          </a>{' '}
        </Description>
      </div>
    </>
  );
};

export default Home;
