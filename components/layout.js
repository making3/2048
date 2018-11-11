import Head from 'next/head';
import Header from './header';
import css from '../styles/layout.scss';

export default ({children}) => (
  <div>
    <Head>
      <title>2048</title>
    </Head>
    <Header />
    <div className={css.layout}>
      {children}
    </div>
  </div>
);
