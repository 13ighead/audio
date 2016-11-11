/**
 * @file index
 * @author Bighead
 */

import defaultConfig from './config.js';
import debug from './debug.js';

module.exports = class Player {
    constructor(options) {
        this._config = Object.assign({}, defaultConfig, options);
        this._instance = new Audio();
        this._eventHandler = {};

        this._config.events.forEach(eventType => {
            this._instance.addEventListener(eventType, e => {
                const list = this._eventHandler[eventType];
                if (!list) {
                    return;
                }
                this._eventHandler[eventType].forEach(handler => {
                    if (typeof handler.fn !== 'function') {
                        return;
                    }
                    handler.fn(e);
                });
            });
        });
    }

    src(url) {
        if (url) {
            if (url === this._instance.src) {
                debug.warn(`The url is same as current url. [${url}]`);
            }
            else {
                this._instance.src = url;
            }
            return url;
        }

        return this._instance.src;
    }

    play() {
        this._instance.play();
    }

    pause() {
        this._instance.pause();
    }

    on(eventType, callback) {
        if (!eventType) {
            debug.warn(`The eventType must not be empty.`);
            return;
        }
        if (!callback) {
            debug.warn(`The callback must not be empty.`);
            return;
        }

        if (this._config.events.indexOf(eventType) === -1) {
            debug.warn(`The eventType is not supported yet. [${eventType}]`);
            return;
        }

        if (typeof callback !== 'function') {
            debug.warn(`The callback must be function.`);
            return;
        }

        if (!this._eventHandler[eventType]) {
            this._eventHandler[eventType] = [];
        }

        let list = this._eventHandler[eventType];

        if (list.indexOf(callback) >= 0) {
            return;
        }

        list.push({
            fn: callback
        });
    }

    off(eventType, callback) {
        if (!eventType) {
            this._eventHandler = {};
        }
        else if (!this._eventHandler[eventType]) {
            return;
        }

        if (callback && typeof callback !== 'function') {
            debug.warn(`The callback must be function.`);
            return;
        }

        if (!callback) {
            this._eventHandler[eventType] = [];
            return;
        }

        let list = this._eventHandler[eventType];
        for (let index = 0, length = list.length; index < length; index--) {
            let handler = list[index];
            if (handler.fn === callback) {
                list.splice(index, 1);
                break;
            }
        }
    }
}
