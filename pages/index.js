import Layout from '../components/layout'
import Game from './game'
import css from '../styles/site.scss'

export default () => (
  <Layout>
    <div className={css.title}>
      <h1>2048</h1>
    </div>

    <div className={css.layout}>
      <Game />
    </div>
  </Layout>
)
