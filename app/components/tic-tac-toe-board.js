import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { set } from '@ember/object';
export default class TicTacToeBoardComponent extends Component {
  @tracked board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];

  @action
  onClickCell(row, column) {
    // Handle cell click event here
    console.log(`Cell (${row}, ${column}) clicked!`);
    set(this.board[row], column, 'X'); // Replace "X" with "O" for alternate turns
    if (this.board[row][column] === '') {
    }
  }
}
