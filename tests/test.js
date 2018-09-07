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

// vector only test
var vector = require('./../lib/vector')
var result = vector.svg_object(text)

console.log('vector.svg_object test', 
	result.size === 31 ? 'passed' : 'failed', 
	result.path === 'M1 1h7v7h-7zM10 1h7v1h1v1h-1v2h1v1h-2v-1h-1v-1h1v-1h-1v1h-1v-2h-2v1h-1v1h-1v5h-1v-6h1zM19 1h3v1h-3zM23 1h7v7h-7zM2 2v5h5v-5zM24 2v5h5v-5zM3 3h3v3h-3zM25 3h3v3h-3zM12 4h2v2h-1v1h-1v1h-1v-2h1zM21 4h1v2h-1zM19 5h1v1h-1zM13 7h1v2h-1zM15 7h1v2h-1zM17 7h1v2h-1zM19 7h1v1h-1zM21 7h1v1h-1zM20 8h1v1h1v1h1v-1h5v1h-2v2h-2v1h-2v2h-4v1h-1v1h1v4h1v2h-1v-1h-1v-2h-2v1h-2v-1h-1v-1h2v-1h2v1h1v-1h-1v-1h-1v-1h1v-1h1v-1h-2v-1h5v1h1v-3h-2v-1h1zM1 9h1v2h-1zM3 9h5v1h-1v1h-1v1h-1v-2h-1v2h-1v1h-1v-2h1zM11 9h2v1h4v2h-2v1h-1v-1h-1v-1h-2zM18 9h1v1h-1zM9 10h1v1h-1zM24 10v1h1v-1zM29 10h1v1h-1zM7 11h1v1h-1zM18 11h1v1h-1zM22 11v1h1v-1zM6 12h1v1h1v1h-2v1h-1v1h-1v-1h-1v-2h3zM9 12h4v1h1v3h-1v-1h-2v-1h-2zM26 12h1v1h1v1h-2zM28 12h1v1h-1zM1 14h1v1h-1zM8 14h1v2h-2v-1h1zM23 14h3v1h2v1h-2v1h-3v-1h2v-1h-2zM29 14h1v1h-1zM2 15h1v2h-1zM10 15h1v1h2v1h-1v1h-1v-1h-2v-1h1zM22 15h1v1h-1zM5 16h2v1h-2zM20 16h2v1h-2zM28 16h1v1h-1zM4 17h1v1h-1zM7 17h1v1h-1zM26 17h2v3h-1v-2h-1zM1 18h3v1h2v-1h1v1h2v2h-1v-1h-2v1h-1v-1h-2v-1h-1v3h-1zM9 18h1v1h-1zM21 18h5v4h1v-1h1v-1h1v1h1v2h-2v1h-2v2h-3v1h3v-1h1v-1h1v-1h2v1h-1v1h1v1h-1v2h-1v-1h-1v1h1v1h-2v-1h-2v1h-1v-2h-1v-2h-1v-2h-2v-1h2v-1h-1v-2h1zM29 18h1v1h-1zM10 19h1v1h-1zM19 19h1v1h-1zM11 20h1v1h-1zM22 20v1h1v-1zM24 20v1h1v-1zM4 21h1v1h-1zM7 21h1v1h-1zM12 21h1v1h1v1h-3v-1h1zM15 21h1v1h-1zM9 22h1v1h-1zM22 22v3h3v-3zM1 23h7v7h-7zM10 23h1v1h-1zM16 23h1v1h-1zM23 23h1v1h-1zM2 24v5h5v-5zM9 24h1v1h1v2h1v3h-1v-2h-2zM15 24h1v1h-1zM17 24h1v1h-1zM3 25h3v3h-3zM13 25h1v1h-1zM18 25h1v1h-1zM12 26h1v1h-1zM15 26h3v1h-1v1h-1v-1h-1zM19 26h1v1h1v1h-2zM13 27h1v1h-1zM21 28h1v1h-1zM9 29h1v1h-1zM14 29h2v1h-2zM17 29h1v1h-1zM20 29h1v1h-1z'
				? 'passed'
				: 'failed'
	)
