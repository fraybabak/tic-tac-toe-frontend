import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

const PAGE_SIZE = 5;

export default class GameListWithPaginationComponent extends Component {
  @tracked currentPage = 1;

  get games() {
    const startIndex = (this.currentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    return this.args.games.slice(startIndex, endIndex);
  }

  get showPreviousPage() {
    return this.currentPage > 1;
  }

  get showNextPage() {
    return this.currentPage < Math.ceil(this.args.games.length / PAGE_SIZE);
  }

  @action
  previousPage() {
    if (this.showPreviousPage) {
      this.currentPage--;
    }
  }

  @action
  nextPage() {
    if (this.showNextPage) {
      this.currentPage++;
    }
  }
}
