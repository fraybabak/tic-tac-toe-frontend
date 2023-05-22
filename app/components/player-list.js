import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

const PLAYERS_PER_PAGE = 5;

export default class PlayerListComponent extends Component {
  @tracked currentPage = 1;

  get players() {
    const startIndex = (this.currentPage - 1) * PLAYERS_PER_PAGE;
    const endIndex = startIndex + PLAYERS_PER_PAGE;
    return this.args.players.slice(startIndex, endIndex);
  }

  get totalPages() {
    return Math.ceil(this.args.players.length / PLAYERS_PER_PAGE);
  }

  get showPreviousPage() {
    return this.currentPage > 1;
  }

  get showNextPage() {
    return this.currentPage < this.totalPages;
  }

  previousPage = () => {
    if (this.showPreviousPage) {
      this.currentPage--;
    }
  };

  nextPage = () => {
    if (this.showNextPage) {
      this.currentPage++;
    }
  };
}
