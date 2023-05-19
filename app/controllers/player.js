import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class PlayerController extends Controller {
  @service store; // Inject the Ember Data store service

  @tracked players; // Define a tracked property to hold the fetched players

  @action
  getFullName(player) {
    return `${player.name} ${player.user_name}`;
  }
}
