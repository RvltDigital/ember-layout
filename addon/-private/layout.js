import Route from '@ember/routing/route';

const mixin = (layout, target) => class LayoutRoute extends target
{
    buildRouteInfoMetadata()
    {
        const meta = super.buildRouteInfoMetadata() || {};
        meta.layout = layout;
        return meta;
    }
}

function layout(layout)
{
    return function (target) {

        if (!(target.prototype instanceof Route)) {
            /* eslint no-console: ["error", { allow: ["warn"] }] */
            console.warn('The layout decorator can be used only for routes.');
            return target;
        }

        return mixin(layout, target);
    }

}

export default layout;
