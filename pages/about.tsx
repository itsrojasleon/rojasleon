import Head from 'next/head';
import Link from 'next/link';
import Description from '../components/Description';
import Subtitle from '../components/Subtitle';
import Text from '../components/Text';

const About = () => {
  return (
    <>
      <Head>
        <title>About - rojasleon</title>
      </Head>
      <Subtitle subtitle="Hello again!" />
      <Description>
        <Text>
          My name's Juan Luis Rojas León. When I was 15 years old I discovered
          this incredible world of programming, after that I knew what my life
          purpose was going to be. I started programming with Java and PHP but
          it was a headache for me, then I switched to Javascript (I loved it, I
          wish I had started with than language or another one like Python) and
          I'm still using it in my projects with Typescript. I've been playing
          around a couple of different programming languages, one of them is Go.
          I feel confident writing Node code but I just wanted to do things a
          bit different, I wanted to have more options when writing backend code
          and of course more job opportunities; that's why I tried Go. And I'm
          100% sure that this text will change in the coming months or years
          because I'm always in "learning mode" and you should too.
        </Text>
        <Text className="text-red-200">
          I really enjoy walking, especially with my dogs. So{' '}
          <Link href="https://www.youtube.com/channel/UCoZmXGOKBs0Zc6izaJhwwJw">
            <a target="_blank" className="text-blue-500 font-bold">
              I created a youtube channel
            </a>
          </Link>{' '}
          where you can see what's going on, hope you enjoy it!
        </Text>
        <Text>See you on the internet! 😊</Text>
      </Description>
    </>
  );
};

export default About;
