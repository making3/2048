const cacheName = '2048';

export function getExistingGame() {
  const cachedGame = localStorage.getItem(cacheName);
  if (cachedGame) {
    return JSON.parse(cachedGame);
  }
}

export function updateGameCache(gameData) {
  localStorage.setItem(cacheName, JSON.stringify(gameData));
}
