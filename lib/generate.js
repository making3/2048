export function getRandomTileNumber() {
  return Math.random() < 0.9 ? 2 : 4;
}

export function getRandomNumber(max) {
  return Math.floor(Math.random() * (max));
}
