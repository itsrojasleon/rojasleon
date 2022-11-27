import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Description from '../../components/Description';
import Subtitle from '../../components/Subtitle';
import Text from '../../components/Text';
import { getResources, Resources } from '../../utils/resources';

interface Note {
  title: string;
  description: string;
  route: string;
  date: string;
}

interface Props {
  notes: Note[];
}

const Notes = ({ notes }: Props) => {
  return (
    <>
      <Head>
        <title>Notes - rojasleon</title>
      </Head>
      <Subtitle subtitle="Notes" />
      <Description>
        When I'm learning something new I found that you can forget something
        easly... and that's why I decided to create this list of notes to help
        me in that process. So when I learn something cool I'm going to put it
        right here 😊 .
      </Description>
      <ul className="list-disc">
        {notes.map((note) => (
          <li key={note.title} className="flex items-center gap-3">
            <Link
              href="/notes/[slug]"
              as={`/notes/${note.route}`}
              className="text-xl hover:underline">
              {note.title}
            </Link>
            <Text className="font-light dark:text-gray-300 antialiased">
              {note.date}
            </Text>
          </li>
        ))}
      </ul>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const notes: Note[] = getResources(Resources.Notes);

  return {
    props: {
      notes: notes.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      )
    }
  };
};

export default Notes;
