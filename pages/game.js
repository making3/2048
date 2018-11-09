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
    let i = 0;
    while (i < 2) {
      const row = getRandomNumber(4);
      const col = getRandomNumber(4);
      if (this.state.grid[row][col] === 0) {
        // TODO: Add possibility of generating a 4 here and addRandom2.
        this.state.grid[row][col] = 2;
        i++;
      }
    }
    this.setState({
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
      <div>
        <div className={css.score}>
          <label className={css.label}>Score</label>
          {this.state.score}
        </div>
        <div className={css.game}>{tiles}</div>
      </div>
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
    const score = this.handleArrowEvent(key);
    this.setState({
      grid: this.state.grid,
      score: this.state.score + score
    });
  }
  handleArrowEvent(key) {
    switch (key.toLowerCase()) {
      case 'arrowdown':
        return move(this.state.grid, new DownEnumerator());
      case 'arrowup':
        return move(this.state.grid, new UpEnumerator());
      case 'arrowleft':
        return move(this.state.grid, new LeftEnumerator());
      case 'arrowright':
        return move(this.state.grid, new RightEnumerator());
      default:
        return 0;
    }
  }
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
  getValue(grid, col, row = this.x) {
    return grid[row][col];
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
  getValue(grid, row, col = this.x) {
    return grid[row][col];
  }
  setValue(grid, row, value) {
    grid[row][this.x] = value;
  }
  getEmptyCoordinates(row) {
    return { row, col: this.x };
  }
}

class RightEnumerator extends DownEnumerator {
  getValue(grid, row, col = this.x) {
    return grid[row][col];
  }
  setValue(grid, row, value) {
    grid[row][this.x] = value;
  }
  getEmptyCoordinates(row) {
    return { row, col: this.x };
  }
}

function move(grid, enumerator) {
  let score = 0;
  const emptyCoordinates = [];
  shiftGrid(grid, enumerator.getValue.bind(enumerator), (i, values) => {
    const stack = [];
    while (!enumerator.eof()) {
      enumerator.setValue(grid, i, enumerator.getValueFromStack(values) || 0);
      if (stack.length > 0 && stack[stack.length - 1] === enumerator.getValue(grid, i)) {
        enumerator.previous();
        const newValue = enumerator.getValue(grid, i) + stack.pop()
        score += newValue;
        enumerator.setValue(grid, i, newValue);
      }
      if (enumerator.getValue(grid, i) === 0) {
        emptyCoordinates.push(enumerator.getEmptyCoordinates(i));
      } else {
        stack.push(enumerator.getValue(grid, i));
      }
      enumerator.next();
    }
    enumerator.reset();
  });

  // TODO: Don't add a random 2 if tiles were not shifted (i.e. it was already at an edge).
  addRandom2(grid, emptyCoordinates);
  return score;
}

function shiftGrid(grid, getValueFromGrid, map) {
  for (let i = 0; i < 4; i++) {
    const s = [];

    for (let k = 0; k < 4; k++) {
      const value = getValueFromGrid(grid, i, k);
      if (value > 0) {
        s.push(value);
      }
    }
    map(i, s);
  }
}

function addRandom2(grid, emptyCoordinates) {
  const coordinate = getRandomNumber(emptyCoordinates.length);
  const {row,col} = emptyCoordinates[coordinate];

  grid[row][col] = 2;
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
