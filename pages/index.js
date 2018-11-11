import Layout from '../components/layout';
import Game from './game';
import css from '../styles/site.scss';

export default () => (
  <Layout>
    <div className={css.layout}>
      <h1 className={css.title}>2048</h1>
      <Game />
    </div>
  </Layout>
)
