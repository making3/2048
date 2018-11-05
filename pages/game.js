import {Component} from 'react'
import css from '../styles/game.scss'

export default class Game extends Component {
  state = {
    score: 0,
    grid: [0,0,0,0,0,0,0,0,0,0,4,2,0,0,0,0]
  }
  render() {
    const tiles = this.state.grid.map((n, i) => {
      if (n === 0) {
        return <div className={css.emptyTile} key={i}></div>
      }

      const tileClass = css['tile' + n];
      return <div className={tileClass} key={i}>
        <div className={css.number}>{n}</div>
      </div>
    })

    return (
      <div className={css.game}>{tiles}</div>
    )
  }
}
