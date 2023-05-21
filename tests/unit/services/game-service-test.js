import { module, test } from 'qunit';
import { setupTest } from 'tic-toc-frontend/tests/helpers';

module('Unit | Service | gameService', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let service = this.owner.lookup('service:game-service');
    assert.ok(service);
  });
});
