"use strict";

var QR = require('./qr-base').QR;
var png = require('./png');
var vector = require('./vector');
var get_options = require('./options');

function qr_image_sync(text, options) {
    options = get_options(options);

    var matrix = QR(text, options.ec_level, options.parse_url);
    var stream = [];
    var result;

    switch (options.type) {
    case 'svg':
    case 'pdf':
    case 'eps':
        vector[options.type](matrix, stream, options.margin, options.size);
        result = stream.filter(Boolean).join('');
        break;
    case 'png':
    default:
        var bitmap = png.bitmap(matrix, options.size, options.margin);
        if (options.customize) {
            options.customize(bitmap);
        }
        png.png(bitmap, stream);
        result = Uint8Array.concat(stream.filter(Boolean));
    }

    return result;
}

module.exports = qr_image_sync;
