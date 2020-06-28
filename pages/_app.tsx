import { AppProps } from 'next/app';
import Layout from '../components/Layout';
import '../styles/index.css';
import '../styles/markdown.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
