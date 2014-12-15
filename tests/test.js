#!/usr/bin/env node

var fs = require('fs');
function file(name) {
    return fs.createWriteStream(__dirname + '/' + name);
}

var qr = require('./../');
var text = 'I \u2764\uFE0F QR code!';
var text = 'https://yadi.sk/d/FuzPeEg-QyaZN?qr';
var ec_level = 'Q';

qr.image(text, { type: 'png', ec_level: ec_level, parse_url: false, margin: 1}).pipe(file('qr_f.png'));
qr.image(text, { type: 'png', ec_level: ec_level, parse_url: true,  margin: 1}).pipe(file('qr_t.png'));
qr.image(text, { type: 'svg', ec_level: ec_level}).pipe(file('qr.svg'));
qr.image(text, { type: 'eps', ec_level: ec_level}).pipe(file('qr.eps'));
qr.image(text, { type: 'pdf', ec_level: ec_level}).pipe(file('qr.pdf'));

/*
var raw = fs.readFileSync(__dirname + '/emblem.raw');
raw.w = 45;
raw.h = 35;
qr.image(text, {
    type: 'png',
    ec_level: 'H',
    size: 5,
    margin: 4,
    customize: function(data) {
        var x = (data.size - raw.w) / 2;
        var y = (data.size - raw.h) / 2;

        for (var i = 0; i < raw.h; i++) {
            var offset = (y + i) * (data.size + 1) + x + 1;
            raw.copy(data.data, offset, i * raw.w, (i + 1) * raw.w);
        }
    }
}).pipe(file('qr-emblem.png'));
*/
