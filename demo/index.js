/**
 * @file index
 * @author Bighead
 */
import Player from '../src/index.js';
import playlist from '../src/extensions/playlist.js';

Player.use(playlist);

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
const p = document.querySelector('p');

player.on('timeupdate', function (event) {
    p.innerHTML = this.currentTime();
});

player.addList(list);
player.play();

window.player = player;
window.Player = Player;
