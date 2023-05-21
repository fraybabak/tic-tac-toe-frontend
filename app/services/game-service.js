import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class GameServiceService extends Service {
  @tracked Player_one;
  @tracked Player_two;
  @tracked game;
  @tracked showBoard = false;
}
