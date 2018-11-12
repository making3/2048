import { Component } from 'react';
import css from '../styles/swipe.scss';

// Swipe direction credits: https://stackoverflow.com/a/23230280/724591
export default class Swipe extends Component {
  constructor(props) {
    super(props);
    this.resetTouchCoordinates();
  }
  handleTouchStart(e) {
    this.x = e.touches[0].clientX;
    this.y = e.touches[0].clientY;
  }
  handleTouchMove(e) {
    if (!this.x || !this.y) {
        return;
    }

    this.xMove = e.touches[0].clientX;
    this.yMove = e.touches[0].clientY;
  }
  handleTouchEnd() {
    if (this.x && this.y && this.xMove && this.yMove) {
      const xDiff = this.x - this.xMove;
      const yDiff = this.y - this.yMove;

      if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0) {
          /* left swipe */
          if (this.props.onSwipeLeft) {
            this.props.onSwipeLeft();
          }
        } else if (this.props.onSwipeRight) {
          /* right swipe */
          this.props.onSwipeRight();
        }
      } else {
        if (yDiff > 0) {
          /* up swipe */
          if (this.props.onSwipeUp) {
            this.props.onSwipeUp();
          }
        } else if (this.props.onSwipeDown) {
          /* down swipe */
          this.props.onSwipeDown();
        }
      }
    }
    this.resetTouchCoordinates();
  }
  resetTouchCoordinates() {
    this.x = null;
    this.y = null;
    this.xMove = null;
    this.yMove = null;
  }
  render(e) {
    const { children } = this.props;
    return <div
      className={css.swipe}
      onTouchStart={touchStartEvent => this.handleTouchStart(touchStartEvent)}
      onTouchMove={touchMoveEvent => this.handleTouchMove(touchMoveEvent)}
      onTouchEnd={() => this.handleTouchEnd()}>
      { children }
    </div>;
  }
}
