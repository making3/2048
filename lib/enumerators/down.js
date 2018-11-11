import { UpEnumerator } from './up';

export class DownEnumerator extends UpEnumerator {
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
