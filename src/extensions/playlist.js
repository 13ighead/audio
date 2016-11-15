/**
 * @file playlist
 * @author Bighead
 */

import debug from '../debug.js';

export default {
    playlist: {
        index: 0,
        list: [{
            url: 'http://fdfs.xmcdn.com/group13/M00/F1/49/wKgDXVak1c7y2Fj2AJ9UCoThL50588.mp3',
            title: 'title1',
            subTitle: 'subTitle1',
            cover: 'http://fdfs.xmcdn.com/group16/M06/E9/21/wKgDbFaeMPKRrB8uAAID3jR0-Lk065_mobile_large.jpg'
        },
        {
            url: 'http://fdfs.xmcdn.com/group13/M00/F1/49/wKgDXVak1c7y2Fj2AJ9UCoThL50588.mp3',
            title: 'title2',
            subTitle: 'subTitle2',
            cover: 'http://fdfs.xmcdn.com/group16/M06/E9/21/wKgDbFaeMPKRrB8uAAID3jR0-Lk065_mobile_large.jpg'
        },
        {
            url: 'http://fdfs.xmcdn.com/group13/M00/F1/49/wKgDXVak1c7y2Fj2AJ9UCoThL50588.mp3',
            title: 'title3',
            subTitle: 'subTitle3',
            cover: 'http://fdfs.xmcdn.com/group16/M06/E9/21/wKgDbFaeMPKRrB8uAAID3jR0-Lk065_mobile_large.jpg'
        }]
    },

    prev() {
        debug.log('prev');
        if (--this.playlist.index < 0) {
            this.playlist.index = this.playlist.list.length - 1;
        }
        this.play();
    },

    next() {
        debug.log('next');
        if (++this.playlist.index >= this.playlist.list.length) {
            this.playlist.index = 0;
        }
        this.play();
    },

    play() {
        console.log(this.playlist.index);
        this.currentSource(this.playlist.list[this.playlist.index]);
        this._play();
    }
};
