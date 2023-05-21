import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import TicTacToeBot from '../helpers/tic-tac-toe-bot';

import { set } from '@ember/object';

export default class TicTacToeBoardComponent extends Component {
  bot = new TicTacToeBot();
  @service router;
  @service gameService;
  @tracked gameBoard = {
    0: '',
    1: '',
    2: '',
    3: '',
    4: '',
    5: '',
    6: '',
    7: '',
    8: '',
  };
  currentPlayer = 'X';
  constructor() {
    super(...arguments);
    this.initializeGameState();
  }

  async initializeGameState() {
    await this.initializeGame();
    await this.calculateMoves();
  }

  @action
  async makeMove(position) {
    if (
      this.gameBoard[position] !== '' ||
      ['finished', 'draw'].includes(this.gameService.game.status)
    ) {
      return; // Cell already taken
    }

    let moveResponse = await fetch('http://127.0.0.1:3000/move/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        game_id: this.gameService.game.id,
        player_id:
          this.currentPlayer === 'X'
            ? this.gameService.game.player_one_id
            : this.gameService.game.player_two_id,
        position: position,
      }),
    });

    if (moveResponse.ok) {
      set(this.gameBoard, `${position}`, this.currentPlayer);
      this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
      this.changeGameStatus(await moveResponse.json());
      if (this.currentPlayer === 'O') {
        this.makeMove(this.bot.bestMove(this.gameBoard, 'O'));
      }
    }
  }

  changeGameStatus(data) {
    this.gameService.game = data.stat.game;
  }

  async initializeGame() {
    if (!this.gameService.game) {
      let gameId = this.router.currentRoute.params.id;
      this.gameService.game = await getGame(gameId);
      this.gameService.Player_one = await getPlayer(
        this.gameService.game.player_one_id
      );
      this.gameService.Player_two = await getPlayer(
        this.gameService.game.player_two_id
      );
      console.log(this.gameBoard);
    }
  }

  async calculateMoves() {
    let gameId = this.router.currentRoute.params.id;
    this.gameService.moves = await getMoves(gameId);
    if (this.gameService.moves.length > 0) {
      console.log(this.gameService.moves[this.gameService.moves.length - 1]);
      this.currentPlayer =
        this.gameService.moves[this.gameService.moves.length - 1].player_id ===
        this.gameService.game.player_one_id
          ? 'O'
          : 'X';
      this.gameService.moves.forEach((move) => {
        let column = move.position;
        set(
          this.gameBoard,
          `${column}`,
          move.player_id === this.gameService.game.player_one_id ? 'X' : 'O'
        );
      });
    }
  }
}

async function getGame(gameId) {
  let gameResponse = await fetch(`http://localhost:3000/game/get/${gameId}`);
  if (gameResponse.ok) {
    let game = await gameResponse.json();
    return game;
  }
}

async function getPlayer(playerId) {
  let playerResponse = await fetch(
    `http://localhost:3000/player/get/${playerId}`
  );
  if (playerResponse.ok) {
    let player = await playerResponse.json();
    return player;
  }
}
async function getMoves(gameId) {
  let movesResponse = await fetch(`http://localhost:3000/move/list/${gameId}`);
  if (movesResponse.ok) {
    let moves = await movesResponse.json();
    return moves;
  }
  return [];
}
