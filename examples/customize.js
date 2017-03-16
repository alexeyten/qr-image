#!/usr/bin/env node
'use strict';

const qr = require('../');

function coord2offset(x, y, size) {
    return (size + 1) * y + x + 1;
}

/**
 * bitmap.size — width (and height) of resulting image in pixels
 * bitmap.data — Buffer with image data. It's a linear representation
 * of image in format:
 *    <00> <xx> <xx> ..        <xx>
 *    <00> <xx> <xx> ..        <xx>
 *    ..
 *    <00> <xx> <xx> ..        <xx>
 *    ^    | size number of bytes |
 *    \ do not modify. Must be 00
 *
 * Each <xx> is a pixel of image. It's value 0 — black, 255 — white,
   everything between are shades of gray.
 */
function customize(bitmap) {
    const size = bitmap.size;
    const data = bitmap.data;

    for (let x = 0; x < size; x++) {
        for (let y = 0; y < x; y++) {
            const offset = coord2offset(x, y, size);
            // If it's white change it's color
            if (data[offset]) {
                data[offset] = 255 - Math.abs(x - y);
            }
        }
    }
}

qr.image('Customize PNG', {
    type: 'png',
    customize
}).pipe(
    require('fs').createWriteStream('custom.png')
);
