#!/usr/bin/env node

import qr from '../lib/qr.js';
var text = process.argv.slice(2).join(' ');

if (!text) {
    console.error('Usage: node qr-svg.js "text to encode" > qr.svg');
    process.exit(1);
}

qr.image(text, { type: 'svg' }).pipe(process.stdout);
