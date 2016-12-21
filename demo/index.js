/**
 * @file index
 * @author Bighead
 */
import Player from '../src/index.js';

let player = new Player();
let func = {
    play() {
        console.log('play');
    },
    pause() {
        console.log('pause');
    }
};

const list  = [{
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
}];

const events = [
    'ready',
    'progress',
    'loadstart',
    'canplay',
    'waiting',
    'play',
    'pause',
    'playing',
    'ended',
    'timeupdate',
    'error'
];
const span = document.querySelectorAll('span');
const img = document.querySelector('img');

player.on('play', function () {
    span[0].innerHTML = this.currentSource().title;
    span[1].innerHTML = this.currentSource().subTitle;
    img.src = this.currentSource().cover;
});

const formatTime = time => {
    time = Math.floor(time);
    return `${Math.floor(time / 60)}:${Math.floor(time % 60)}`;
};

player.on('timeupdate', function (event) {
    span[2].innerHTML = formatTime(this.currentTime());
    span[3].innerHTML = formatTime(this.durationTime());
});


window.player = player;
window.Player = Player;
