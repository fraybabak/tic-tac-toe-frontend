import EmberRouter from '@ember/routing/router';
import config from 'tic-toc-frontend/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('/');
  this.route('players');
  this.route('games');
  this.route('new-game');
  this.route('game', { path: '/game/:id' });
});
