import css from '../styles/header.scss';
import Link from './link';

const Header = () => (
  <div className={css.header}>
    <Link href="/">
      <a>2048</a>
    </Link>
  </div>
);

export default Header;
