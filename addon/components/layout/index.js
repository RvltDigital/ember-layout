import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

class LayoutComponent extends Component
{
    @service layout;

    get current() {
        return `layout/${this.layout.current}`;
    }
}

export default LayoutComponent;
