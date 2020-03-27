import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { bind } from '@ember/runloop';
import { get } from '@ember/object';
import { getOwner } from '@ember/application';

class LayoutService extends Service
{
    @tracked current
    @service router
    defaultLayoutName = null

    constructor()
    {
        super(...arguments);
        const config = getOwner(this).resolveRegistration('config:environment');
        let defaultLayoutName;
        if (typeof (defaultLayoutName = get(config, 'ember-layout.defaultLayoutName')) !== 'string') {
            throw 'The "defaultLayoutName" config must be string.'
        }
        this.defaultLayoutName = defaultLayoutName;
        this.current = get(this.router, 'currentRoute.metadata.layout') || this.defaultLayoutName;
        this.router.on('routeWillChange', bind(this, this.routeWillChange));
    }

    routeWillChange({ to })
    {
        const result = to.find((item, index) => index !== 0 && typeof get(item, 'metadata.layout') === 'string');
        this.current = !result? this.defaultLayoutName: result.metadata.layout;
    }
}


export default LayoutService;
