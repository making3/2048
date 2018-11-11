import { Component } from 'react';
import css from '../styles/game.scss';
import { getRandomTileNumber, UpEnumerator, DownEnumerator, LeftEnumerator, RightEnumerator } from '../lib';
import Score from '../components/score';

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = getNewState(0);
  }
  componentDidMount() {
    document.addEventListener('keydown', (event) => {
      this.handleKeyPress(event.key);
    });
    addRandom2(this.state.grid);
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
        <button className={css.newGame} onClick={this.resetGame.bind(this)}>New Game</button>
        <Score score={this.state.score} label="Score" />
        <Score score={this.state.highScore} label="High Score" />
        <div className={css.game}>
          {!this.state.active &&
            <div className={css.gameOver}>
              <label className={css.label}>Game Over!</label>
            </div>
          }
          {tiles}
        </div>
      </div>
    )
  }
  resetGame() {
    const resetState = getNewState(this.state.highScore);
    addRandom2(resetState.grid);
    this.setState(resetState);
  }
  handleKeyPress(key) {
    if (!this.state.active) {
      return;
    }

    /*
      Parts:
      1. Move grid items the direction specified
      2. Join adjacent numbers if they are equal
      3. Add a 2 to a random location on the board with a 0.
        3a. End the game *if* the board is filled.
    */
    const { score, active } = this.handleArrowEvent(key);
    const newScore = this.state.score + score;
    const highScore = this.state.highScore > newScore ? this.state.highScore : newScore;

    this.setState({
      grid: this.state.grid,
      score: newScore,
      active,
      highScore
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
        return { score: 0, active: true };
    }
  }
}

function addRandom2(grid) {
  let i = 0;
  while (i < 2) {
    const row = getRandomNumber(4);
    const col = getRandomNumber(4);
    if (grid[row][col] === 0) {
      grid[row][col] = getRandomTileNumber();
      i++;
    }
  }
}

function move(grid, enumerator) {
  let score = 0;
  let changedValues = false;
  const emptyCoordinates = [];
  shiftGrid(grid, enumerator.getValue.bind(enumerator), (i, valueStack) => {
    const stack = [];
    while (!enumerator.eof()) {
      const valueBefore = enumerator.getValue(grid, i);
      enumerator.setValue(grid, i, enumerator.getValueFromStack(valueStack) || 0);
      if (stack.length > 0 && stack[stack.length - 1] === enumerator.getValue(grid, i)) {
        enumerator.previous();
        const newValue = enumerator.getValue(grid, i) + stack.pop()
        score += newValue;
        enumerator.setValue(grid, i, newValue);
        changedValues = true;
      }
      const valueAfter = enumerator.getValue(grid, i)
      if (valueAfter === 0) {
        emptyCoordinates.push(enumerator.getEmptyCoordinates(i));
      } else {
        if (valueBefore !== valueAfter) {
          changedValues = true;
        }
        stack.push(enumerator.getValue(grid, i));
      }
      enumerator.next();
    }
    enumerator.reset();
  });

  if (changedValues) {
    addRandom2WithCoordinates(grid, emptyCoordinates);
  }
  return {
    score,
    active: emptyCoordinates.length > 0
  };
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

function addRandom2WithCoordinates(grid, emptyCoordinates) {
  const coordinate = getRandomNumber(emptyCoordinates.length);
  const {row,col} = emptyCoordinates[coordinate];

  grid[row][col] = getRandomTileNumber();
}

// TODO: Move to generate
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

function getNewState(highScore) {
  return {
    score: 0,
    highScore,
    active: true,
    grid: [
      [0,0,0,0],
      [0,0,0,0],
      [0,0,0,0],
      [0,0,0,0]
    ]
  }
}
