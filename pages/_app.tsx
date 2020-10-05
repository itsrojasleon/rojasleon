import { AppProps } from 'next/app';
import Layout from '../components/layout';
import '../styles/index.css';
// import '../styles/markdown.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
