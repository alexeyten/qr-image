#!/usr/bin/env node

var fs = require('fs');
var assert = require('assert');
var eq = require('buffer-equal');
var qr = require('./../');

function streamToBuffer(stream, cb) {
    var bufs = [];

    stream.on('data', function (data) {
        bufs.push(data);
    }).on('end', function () {
        cb(Buffer.concat(bufs));
    });
}

function compare(stream, file) {
    streamToBuffer(stream, function (buf) {
        assert(eq(buf, fs.readFileSync(__dirname + '/fixtures/' + file)));
        console.log(file + ' ok!');
    });
}

var text = 'https://yadi.sk/d/FuzPeEg-QyaZN?qr';
var ec_level = 'Q';

compare(qr.image(text, { type: 'png', ec_level: ec_level, parse_url: false, margin: 1}), 'qr_f.png');
compare(qr.image(text, { type: 'png', ec_level: ec_level, parse_url: true,  margin: 1}), 'qr_t.png');
compare(qr.image(text, { type: 'svg', ec_level: ec_level}), 'qr.svg');
compare(qr.image(text, { type: 'eps', ec_level: ec_level}), 'qr.eps');
compare(qr.image(text, { type: 'pdf', ec_level: ec_level}), 'qr.pdf');

assert(eq(qr.imageSync(text), fs.readFileSync(__dirname + '/fixtures/qr_sync.png')));
console.log('qr_sync.png ok!')
