'use strict';

module.exports = png;

const getOptions = require('./lib/options.js');
const QR = require('./lib/qr-base.js').QR;
const libpng = require('./lib/png.js');

function png(text, options) {
    options = getOptions(options, 'png');

    const matrix = QR(text, options.ec_level, options.parse_url);

    const bitmap = libpng.bitmap(matrix, options.size, options.margin);
    if (options.customize) {
        options.customize(bitmap);
    }

    const stream = [];
    libpng.png(bitmap, stream);
    return Buffer.concat(stream.filter(Boolean));
}
