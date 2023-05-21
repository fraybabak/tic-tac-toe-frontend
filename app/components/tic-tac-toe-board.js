import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { set } from '@ember/object';
export default class TicTacToeBoardComponent extends Component {
  @tracked gameBoard = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];
  @tracked currentPlayer = 'X';
  @action
  async makeMove(row, column) {
    if (this.gameBoard[row][column] !== '') {
      return; // Cell already taken
    }

    let moveResponse = await fetch('/api/moves', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        game_id: this.args.gameId,
        player_id: this.args.currentPlayerId,
        move: { row, column },
      }),
    });

    if (moveResponse.ok) {
      this.gameBoard[row][column] = this.currentPlayer;
      this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    }
  }
}
