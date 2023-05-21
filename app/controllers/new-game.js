import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class NewGameController extends Controller {
  @tracked playerOne = '';
  @tracked playerTwo = '';
  @tracked gameId;
  @tracked playerOneId;
  @tracked playerTwoId;
  @tracked currentPlayerId;
  @tracked p_1;
  @tracked p_2;
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
    let playerOne = await createPlayer(this.playerOne);
    let playerTwo = await createPlayer(this.playerTwo);

    let gameResponse = await fetch('http://localhost:3000/game/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        player_one: playerOne.id,
        player_two: playerTwo.id,
        game_type: 2,
      }),
    });

    if (gameResponse.ok) {
      let game = await gameResponse.json();
      this.gameId = game.id;
      this.playerOneId = game.player_one_id;
      this.playerTwoId = game.player_two_id;
      this.currentPlayerId = this.playerOneId; // Assuming player one always starts
      this.showBoard = true;
    }
  }
}

async function createPlayer(name) {
  console.log(name, 'sadasdasd');
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
