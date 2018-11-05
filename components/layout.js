import Header from './header'
import css from '../styles/site.scss'

export default ({children}) => (
  <div>
    <Header />
    <div>
      {children}
    </div>
  </div>
)
