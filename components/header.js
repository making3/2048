import css from '../styles/site.scss';
import Link from 'next/link';

const Header = () => (
  <div className={css.header}>
    <a href="/" as={`${process.env.ASSET_PREFIX}/`} className={css.home}>2048</a>
  </div>
);

export default Header;
