/**
 * @file index
 * @author Bighead
 */
import Player from '../src/index.js';

window.Player = Player;


let a = new Player();
let func = {
    play() {
        console.log('play');
    },
    pause() {
        console.log('pause');
    }
};
a.on('play', func.play);
a.on('pause', func.pause);
a.src('http://fdfs.xmcdn.com/group13/M00/F1/49/wKgDXVak1c7y2Fj2AJ9UCoThL50588.mp3');
a.play();

window.a = a;
