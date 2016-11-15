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
player.on('play', func.play);
player.on('pause', func.pause);
player.play();

window.player = player;

window.Player = Player;
