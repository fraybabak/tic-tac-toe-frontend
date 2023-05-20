import { module, test } from 'qunit';
import { setupRenderingTest } from 'tic-toc-frontend/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | tic-tac-toe-board', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<TicTacToeBoard />`);

    assert.dom(this.element).hasText('');

    // Template block usage:
    await render(hbs`
      <TicTacToeBoard>
        template block text
      </TicTacToeBoard>
    `);

    assert.dom(this.element).hasText('template block text');
  });
});
