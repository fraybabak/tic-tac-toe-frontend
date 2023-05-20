import { module, test } from 'qunit';
import { setupTest } from 'tic-toc-frontend/tests/helpers';

module('Unit | Controller | new-game', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let controller = this.owner.lookup('controller:new-game');
    assert.ok(controller);
  });
});
