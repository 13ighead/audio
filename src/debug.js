/**
 * @file debug
 * @author Bighead
 */


const PROD = process.argv.indexOf('-p') >= 0;

export default {
    log(msg) {
        if (!PROD) {
            console.log(msg);
        }
    },

    warn(msg) {
        if (!PROD) {
            console.warn(msg);
        }
    },

    error(msg) {
        if (!PROD) {
            console.error(msg);
        }
    }
};
