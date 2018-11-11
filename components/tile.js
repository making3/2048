import css from '../styles/game.scss';

export default ({score}) => {
  if (score === 0) {
    return <div className={css.emptyTile}></div>;
  }

  const tileClass = css[`tile${score}`];
  return <div className={tileClass}>
    <div className={css.number}>{score}</div>
  </div>
}
