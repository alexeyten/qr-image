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

fs.writeFileSync('qr_sync.png', qr.imageSync(text));
