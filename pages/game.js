import {Component} from 'react'
import css from '../styles/game.scss'

export default class Game extends Component {
  state = {
    score: 0,
    grid: [
      [0,0,0,0],
      [0,0,0,0],
      [0,0,4,2],
      [0,0,0,0]
    ]
  }
  render() {
    const tiles = this.state.grid.map((row) => row.map(getTile));

    return (
      <div className={css.game}>{tiles}</div>
    )
  }
}

function getTile(n) {
  if (n === 0) {
    return <div className={css.emptyTile} key={n}></div>
  }

  const tileClass = css['tile' + n];
  return <div className={tileClass} key={n}>
    <div className={css.number}>{n}</div>
  </div>
}
