/**
 * @file playlist
 * @author Bighead
 */

import debug from '../debug.js';

const MODE = [
    'no_repeat',
    'repeat_all',
    'repeat_one',
    'single',
    'random'
];

export default {
    _playlist: {
        index: 0,
        list: []
    },

    _playmode: MODE[0],

    playmode(mode) {

        if (mode !== undefined) {
            if (MODE.indexOf(mode) === -1) {
                debug.warn(`The mode is not supported yet. [${mode}]`);
            }
            else {
                this._playmode = mode;
            }

            return this;
        }

        return this._playmode;
    },

    prev() {
        debug.log('prev');
        const playmode = this._playmode;
        switch (playmode) {
            case MODE[4]:
                this._playlist.index = Math.floor(Math.random() * this._playlist.list.length);
                break;
            default:
                if (--this._playlist.index < 0) {
                    this._playlist.index = this._playlist.list.length - 1;
                }
                break;
        }

        this.play();
    },

    next() {
        debug.log('next');
        const playmode = this._playmode;
        switch (playmode) {
            case MODE[4]:
                this._playlist.index = Math.floor(Math.random() * this._playlist.list.length);
                break;
            default:
                if (++this._playlist.index >= this._playlist.list.length) {
                    this._playlist.index = 0;
                }
                break;
        }

        this.play();
    },

    play() {
        this.currentSource(this._playlist.list[this._playlist.index]);
        this._play();
    },

    addList(sources, index) {
        if (sources === undefined) {
            debug.warn(`The source must not be empty.`);
            return;
        }

        if (!Array.isArray(sources)) {
            sources = [sources];
        }

        let tmp = [];

        for (let source of sources) {
            if (source.url === undefined) {
                debug.warn(`The url must not be empty.`);
                continue;
            }

            tmp.push(source);
        }

        if (index) {
            let last = this._playlist.list.splice(index, this._playlist.list.length - index);
            this._playlist.list = this._playlist.list.concat(sources, last);
        }
        else {
            this._playlist.list = this._playlist.list.concat(sources);
        }
    },

    removeList(index, length) {
        return this._playlist.list.splice(index, length);
    },

    getList(index = 0, length = 0) {
        return this._playlist.list.slice(index, index + length);
    }
};
