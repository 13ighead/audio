/**
 * @file index
 * @author Bighead
 */

import defaultConfig from './config.js';
import debug from './debug.js';
import {mixin} from './util.js';

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
                    handler.fn.apply(this, e);
                });
            });
        });

        this._source = {};
    }

    _play() {
        const url = this._source.url;
        if (!url) {
            debug.log(`The url must not be empty.`);
        }
        else if (this._instance.src !== url) {
            this._instance.src = url;
            this._instance.play();
        }
        else {
            this._instance.play();
        }
    }

    play() {
        this._play();
    }

    pause() {
        this._instance.pause();
    }

    currentSource(source) {
        if (source !== undefined) {
            if (source.url === undefined || source.url.length <= 0) {
                debug.warn(`The url must not be empty.`);
            }
            else {
                this._source = source;
            }
            return this;
        }

        return this._source;
    }

    currentTime(time) {
        if (time !== undefined) {
            this._instance.currentTime = time;

            return this;
        }

        return this._instance.currentTime;
    }

    durationTime() {
        return this._instance.duration;
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

    static use(extensions) {
        if (Array.isArray(extensions)) {
            for (let item of extensions) {
                mixin(item)(this.prototype);
            }
        }
        else {
            mixin(extensions)(this.prototype);
        }
    }
};
