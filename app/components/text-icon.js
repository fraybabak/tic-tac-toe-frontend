import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
export default class TextIconComponent extends Component {
  @tracked icon = '';
  @tracked title = '';
  @tracked body = '';
}
