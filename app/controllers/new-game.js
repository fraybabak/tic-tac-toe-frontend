import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class NewGameController extends Controller {
  @service gameService;
  @service router;
  @tracked playerOne = '';
  @tracked playerTwo = '';
  @tracked showBoard = false;

  @action
  updatePlayerOne(event) {
    this.playerOne = event.target.value;
  }

  @action
  updatePlayerTwo(event) {
    this.playerTwo = event.target.value;
  }

  @action
  async startNewGame() {
    console.log(this.playerOne, this.playerTwo);
    this.gameService.player_one = await createPlayer(this.playerOne);
    this.gameService.player_two = await createPlayer(this.playerTwo);

    let gameResponse = await fetch('http://localhost:3000/game/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        player_one: this.gameService.player_one.id,
        player_two: this.gameService.player_two.id,
        game_type: 2,
      }),
    });

    if (gameResponse.ok) {
      let game = await gameResponse.json();
      this.gameService.game = game;
      this.gameService.showBoard = true;
      this.router.transitionTo('game', game.id);
    }
  }
}

async function createPlayer(name) {
  let playerResponse = await fetch('http://localhost:3000/player/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: name,
    }),
  });

  if (playerResponse.ok) {
    return playerResponse.json();
  }
}
