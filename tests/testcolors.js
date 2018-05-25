#!/usr/bin/env node

var fs = require('fs');
function file(name) {
    return fs.createWriteStream(__dirname + '/' + name);
}

var qr = require('./../');
var text = 'I \u2764\uFE0F QR codes with colors!';

var cmykColor = [0.5, 0, 0, 0.3];   // Note 4 members: c,m,y,k
var rgbColor  = [255, 0, 128];      // Note 3 members: r,g,b
var grayColor = 0.85;               // Single number means shade of gray
var nameColor = "purple";          // any valid HTML color name

qr.image(text, { type: 'png', color: nameColor, transparent: true}).pipe(file('qr_transp.png'));
qr.image(text, { type: 'svg', color: nameColor }).pipe(file('qr_'+nameColor+'.svg'));
qr.image(text, { type: 'eps', color: rgbColor, transparent: false }).pipe(file('qr_with_white.eps'));
qr.image(text, { type: 'pdf', color: cmykColor, background: grayColor, transparent: false }).pipe(file('qr_with_gray_back.pdf'));

fs.writeFileSync(__dirname + '/qr_sync.png', qr.imageSync(text, {transparent: false}));

