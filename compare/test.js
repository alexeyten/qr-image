'use strict';

const qr3 = require('qr-image');
const qr4 = require('../svg');

const text = 'I love SVG!!!111oneone';
const opts = {
    type: 'svg',
    size: 0
};

const res = {
    a1: qr3.imageSync(text, opts),
    a2: qr4(text, opts)
};

console.log(res.a1 === res.a2);
