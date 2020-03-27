import Route from '@ember/routing/route';
import { getOwner } from '@ember/application';

class LayoutRoute extends Route
{
    layout = null

    buildRouteInfoMetadata()
    {
        const meta = super.buildRouteInfoMetadata() || {};
        let layout = this.layout;
        if (typeof layout !== 'string') {
            layout = getOwner(this).resolveRegistration('config:environment')['ember-layout'].defaultLayoutName;
        }
        meta.layout = layout;
        return meta;
    }
}

export default LayoutRoute;
