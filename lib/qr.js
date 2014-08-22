"use strict";

var Readable = require('stream').Readable;

var QR = require('./qr-base').QR;
var png = require('./png');
var vector = require('./vector');

var fn_noop = function() {};

var BITMAP_OPTIONS = {
    ec_level: 'M',
    size: 5,
    margin: 4,
    customize: null
};

var VECTOR_OPTIONS = {
    ec_level: 'M',
    margin: 1
};

function get_options(options) {
    if (typeof options === 'string') {
        options = { 'ec_level': options }
    } else {
        options = options || {};
    }
    var _options = {
        type: String(options.type || 'png').toLowerCase()
    };

    var defaults = _options.type == 'png' ? BITMAP_OPTIONS : VECTOR_OPTIONS;

    for (var k in defaults) {
        _options[k] = k in options ? options[k] : defaults[k];
    }

    return _options;
}

function qr_image(text, options) {
    options = get_options(options);

    var matrix = QR(text, options.ec_level);
    var stream = new Readable();
    stream._read = fn_noop;

    switch (options.type) {
    case 'svgpath':
    case 'svg':
    case 'pdf':
    case 'eps':
        process.nextTick(function() {
            vector[options.type](matrix, stream);
        });
        break;
    case 'png':
    default:
        process.nextTick(function() {
            var bitmap = png.bitmap(matrix, options.size, options.margin);
            if (options.customize) {
                options.customize(bitmap);
            }
            png.PNG(bitmap, stream);
        });
    }

    return stream;
}

module.exports = {
    matrix: QR,
    image: qr_image
};
