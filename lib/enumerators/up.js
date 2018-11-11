export class UpEnumerator {
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
