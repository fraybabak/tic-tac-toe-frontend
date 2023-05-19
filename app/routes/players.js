import Route from '@ember/routing/route';

export default class PlayersRoute extends Route {
  model() {
    return getPlayers();
  }
}

async function getPlayers() {
  const response = await fetch('http://localhost:3000/player/list');
  const data = await response.json();
  return data;
}
