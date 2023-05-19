import Route from '@ember/routing/route';

export default class GamesRoute extends Route {
  model() {
    return getGames();
  }
}

async function getGames() {
  const response = await fetch('http://localhost:3000/game/list');
  const data = await response.json();
  return data;
}
