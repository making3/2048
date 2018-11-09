import {Component} from 'react'
import css from '../styles/game.scss'

export default class Game extends Component {
  state = {
    score: 0,
    grid: [
      [0,0,0,0],
      [0,0,8,0],
      [0,0,4,2],
      [0,0,0,0]
    ]
  }
  componentDidMount() {
    document.addEventListener('keydown', (event) => {
      this.handleKeyPress(event.key);
    });
  }
  render() {
    const tiles = this.state.grid.map((row, rowIndex) =>
      row.map((tileValue, colIndex) =>
        getTile(rowIndex, colIndex, tileValue)
      )
    );

    return (
      <div tabIndex="0" className={css.game} onKeyPress={this.handleKeyPress}>{tiles}</div>
    )
  }
  handleKeyPress(key) {
    /*
      Parts:
      1. Move grid items the direction specified
      2. Join adjacent numbers if they are equal
      3. Add a 2 to a random location on the board with a 0.
        3a. End the game *if* the board is filled.
    */
    this.setState({
      grid: this.handleArrowEvent(key)
    });
  }
  handleArrowEvent(key) {
    switch (key.toLowerCase()) {
      case 'arrowdown':
        return moveDown(this.state.grid)
      case 'arrowup':
        return moveUp(this.state.grid)
      case 'arrowleft':
        return moveLeft(this.state.grid)
      case 'arrowright':
        return moveRight(this.state.grid)
      default:
        return this.state.grid;
    }
  }
}

function addRandom2(grid) {
  // TODO: Implement
  return grid;
}

function moveLeft(grid) {
  return shiftGrid(grid, getValueFromGridRow, (row, values) => {
    for (let col = 0; col < 4; col++) {
      grid[row][col] = values.shift() || 0;
    }
  });
}

function moveRight(grid) {
  return shiftGrid(grid, getValueFromGridRow, (row, values) => {
    for (let col = 3; col >=0; col--) {
      grid[row][col] = values.pop() || 0;
    }
  });
}

function moveDown(grid) {
  return shiftGrid(grid, getValueFromGridColumn, (col, values) => {
    for (let row = 3; row >=0; row--) {
      grid[row][col] = values.pop() || 0;
    }
  });
}

function moveUp(grid) {
  return shiftGrid(grid, getValueFromGridColumn, (col, values) => {
    for (let row = 0; row < 4; row++) {
      grid[row][col] = values.shift() || 0;
    }
  });
}

function getValueFromGridRow(grid, col, row) {
  return grid[row][col];
}

function getValueFromGridColumn(grid, row, col) {
  return grid[row][col];
}

function shiftGrid(grid, getValueFromGrid, mapColumn) {
  for (let i = 0; i < 4; i++) {
    const s = [];

    for (let k = 0; k < 4; k++) {
      const value = getValueFromGrid(grid, k, i);
      if (value > 0) {
        s.push(value);
      }
    }
    mapColumn(i, s);
  }
  return grid;
}

function getTile(rowIndex, colIndex, tileValue) {
  const key = rowIndex + colIndex;
  if (tileValue === 0) {
    return <div className={css.emptyTile} key={key}></div>
  }

  const tileClass = css[`tile${tileValue}`];
  return <div className={tileClass} key={key}>
    <div className={css.number}>{tileValue}</div>
  </div>
}
