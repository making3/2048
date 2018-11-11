import css from '../styles/game.scss';

export default ({label, score}) => (
  <div className={css.score}>
    <label className={css.label}>{label}</label>
    {score}
  </div>
)
