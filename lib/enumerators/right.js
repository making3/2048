import { DownEnumerator } from './down';

export class RightEnumerator extends DownEnumerator {
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
