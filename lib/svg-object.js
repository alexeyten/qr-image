"use strict";

var QR = require('./qr-base').QR;
var vector = require('./vector');
var get_options = require('./options');

function svg_object(text, options) {
    options = get_options(options, 'svg');

    var matrix = QR(text, options.ec_level);
    return vector.svg_object(matrix, options.margin);
}

module.exports = svg_object;
