import {Component} from 'react'
import css from '../styles/game.scss'

export default class Game extends Component {
  state = {
    score: 0,
    grid: [
      [0,0,0,0],
      [0,0,0,0],
      [0,0,0,0],
      [0,0,0,0]
    ]
  }
  componentDidMount() {
    document.addEventListener('keydown', (event) => {
      this.handleKeyPress(event.key);
    });
    const row = getRandomNumber(4);
    const col = getRandomNumber(4);
    this.state.grid[row][col] = 2;
    this.setState({
      score: 2,
      grid: this.state.grid
    });
  }
  render() {
    const tiles = this.state.grid.map((row, rowIndex) =>
      row.map((tileValue, colIndex) =>
        getTile(rowIndex, colIndex, tileValue)
      )
    );

    return (
      <div className={css.game}>{tiles}</div>
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
        return moveDown(this.state.grid);
      case 'arrowup':
        return moveUp(this.state.grid);
      case 'arrowleft':
        return moveLeft(this.state.grid);
      case 'arrowright':
        return moveRight(this.state.grid);
      default:
        return this.state.grid;
    }
  }
}

function moveLeft(grid) {
  return move(grid, getValueFromGridRow, new LeftEnumerator());
}

function moveRight(grid) {
  return move(grid, getValueFromGridRow, new RightEnumerator());
}

function moveDown(grid) {
  return move(grid, getValueFromGridColumn, new DownEnumerator());
}

function moveUp(grid) {
  return move(grid, getValueFromGridColumn, new UpEnumerator());
}

class UpEnumerator {
  constructor() {
    this.reset();
  }
  next() {
    this.x++;
  }
  previous() {
    this.x--;
  }
  eof() {
    return this.x >= 4;
  }
  getValue(grid, col) {
    return grid[this.x][col];
  }
  setValue(grid, col, value) {
    grid[this.x][col] = value;
  }
  getEmptyCoordinates(col) {
    return { row: this.x, col };
  }
  getValueFromStack(stack) {
    return stack.shift();
  }
  reset() {
    this.x = 0;
  }
}

class DownEnumerator extends UpEnumerator {
  next() {
    this.x--;
  }
  previous() {
    this.x++;
  }
  eof() {
    return this.x < 0;
  }
  getValueFromStack(stack) {
    return stack.pop();
  }
  reset() {
    this.x = 3;
  }
}

class LeftEnumerator extends UpEnumerator {
  getValue(grid, row) {
    return grid[row][this.x];
  }
  setValue(grid, row, value) {
    grid[row][this.x] = value;
  }
  getEmptyCoordinates(row) {
    return { row, col: this.x };
  }
}

class RightEnumerator extends DownEnumerator {
  getValue(grid, row) {
    return grid[row][this.x];
  }
  setValue(grid, row, value) {
    grid[row][this.x] = value;
  }
  getEmptyCoordinates(row) {
    return { row, col: this.x };
  }
}

function move(grid, getValueFromGrid,  enumerator) {
  const emptyCoordinates = [];
  const newGrid = shiftGrid(grid, getValueFromGrid, (i, values) => {
    const cs = [];
    while (!enumerator.eof()) {
      enumerator.setValue(grid, i, enumerator.getValueFromStack(values) || 0);
      if (cs.length > 0 && cs[cs.length - 1] === enumerator.getValue(grid, i)) {
        enumerator.previous();
        enumerator.setValue(grid, i, enumerator.getValue(grid, i) + cs.pop())
      }
      if (enumerator.getValue(grid, i) === 0) {
        emptyCoordinates.push(enumerator.getEmptyCoordinates(i));
      } else {
        cs.push(enumerator.getValue(grid, i));
      }
      enumerator.next();
    }
    enumerator.reset();
  });
  return addRandom2(newGrid, emptyCoordinates);
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

function addRandom2(grid, emptyCoordinates) {
  const coordinate = getRandomNumber(emptyCoordinates.length);
  const {row,col} = emptyCoordinates[coordinate];

  grid[row][col] = 2;
  return grid;
}

function getRandomNumber(max) {
  return Math.floor(Math.random() * (max));
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
