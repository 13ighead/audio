/**
 * @file config
 * @author Bighead
 */
export default {
    enabled: true,
    autoplay: false,
    loop: false,
    events: [
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
    ]
};
