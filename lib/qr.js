"use strict";

var QR = require('./qr-base').QR;
var png = require('./png');
var vector = require('./vector');
var get_options = require('./options');
var qr_image = require('./image');
var qr_image_sync = require('./image-sync');
var svg_object = require('./svg-object');

module.exports = {
    matrix: QR,
    image: qr_image,
    imageSync: qr_image_sync,
    svgObject: svg_object
};
