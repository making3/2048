import Layout from '../components/layout'
import Game from './game'
import Head from 'next/head'
import css from '../styles/site.scss'

export default () => (
  <Layout>
    <Head>
      <title>2048</title>
    </Head>
    <div className={css.title}>
      <h1>2048</h1>
    </div>

    <div className={css.layout}>
      <Game />
    </div>
  </Layout>
)
