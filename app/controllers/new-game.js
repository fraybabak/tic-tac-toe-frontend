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
  @tracked singlePlayerMode = false;

  @action
  updatePlayerOne(event) {
    this.playerOne = event.target.value;
  }

  @action
  updatePlayerTwo(event) {
    this.playerTwo = event.target.value;
  }

  @action
  toggleGameMode(event) {
    this.singlePlayerMode = event.target.checked;
  }
  @action
  async startNewGame() {
    this.gameService.Player_one = await createPlayer(this.playerOne);
    if (!this.singlePlayerMode) {
      console.log('two player mode');
      this.gameService.Player_two = await createPlayer(this.playerTwo);
    }

    let gameResponse = await fetch('http://localhost:3000/game/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        player_one: this.gameService.Player_one.id,
        ...(!this.singlePlayerMode && {
          player_two: this.gameService.Player_two.id,
        }),
        game_type: this.singlePlayerMode ? 1 : 2,
      }),
    });

    if (gameResponse.ok) {
      let data = await gameResponse.json();
      this.gameService.game = data.game;
      if (this.singlePlayerMode) {
        this.gameService.Player_two = data.player_two;
      }
      this.gameService.showBoard = true;
      this.router.transitionTo('game', data.game.id);
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
