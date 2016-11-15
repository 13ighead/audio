/**
 * @file util.js
 * @author Bighead
 */

// http://raganwald.com/2015/06/17/functional-mixins.html
const shared = Symbol('shared');

export function mixin(behaviour) {
    const instanceKeys = Reflect.ownKeys(behaviour).filter(key => key !== shared);
    const sharedBehaviour = behaviour[shared] || {};
    const sharedKeys = Reflect.ownKeys(sharedBehaviour);

    function mixin(target) {
        for (let property of instanceKeys) {
            Object.defineProperty(target, property, {
                value: behaviour[property]
            });
        }

        return target;
    }
    for (let property of sharedKeys) {
        Object.defineProperty(mixin, property, {
            value: sharedBehaviour[property],
            enumerable: sharedBehaviour.propertyIsEnumerable(property)
        });
    }

    return mixin;
}

mixin.shared = shared;
