import { module, test } from 'qunit';
import { setupTest } from 'tic-toc-frontend/tests/helpers';

module('Unit | Controller | player', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let controller = this.owner.lookup('controller:player');
    assert.ok(controller);
  });
});
