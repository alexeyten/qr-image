#!/usr/bin/env node
'use strict';

var fs = require('fs');
function file(name) {
    return fs.createWriteStream(__dirname + '/res/' + name);
}

var TEXT = fs.readFileSync('war-and-peace.txt');

var Readable = require('stream').Readable;
var fn_noop = function() {};

var base = require('./../lib/qr-base');
var encode = require('./../lib/encode');
var matrix = require('./../lib/matrix');
var png = require('./../lib/png');

var m0 = encode('0');

var EC_LEVELS = 'LMQH'.split('');

for (var version = 1; version <= 40; version++) {
    for (var l = 0; l < 4; l++) {
        var ec_level = EC_LEVELS[l];
        var template = base.getTemplate(m0, ec_level, version);
        var msg = encode(TEXT.slice(0, template.data_len - 5));
        template = base.fillTemplate(msg, template);
        var res = matrix.getMatrix(template);
        var stream = new Readable();
        stream._read = fn_noop;
        png.PNG(matrix.getMatrix(template), 5, 4, stream);
        stream.pipe(file(ec_level + '-' + version + '.png'));
    }
}
