'use strict';

const old_ec = require('./errorcode.js');
const new_ec = require('./ec.js');

const b = new Buffer(512);
b.fill('asd');
const old_res = old_ec(b, 20);
const new_res = new_ec(b, 20);

require('assert').deepEqual(old_res, new_res);

let acc = 0;
for (var n = 0; n < 5; n++) {
    console.time('new');
    for (var i = 0; i < 1000; i++) acc += new_ec(b, 20)[0];
    console.timeEnd('new');
}

acc = 0;
for (var n = 0; n < 5; n++) {
    console.time('old');
    for (var i = 0; i < 1000; i++) acc += old_ec(b, 20)[0];
    console.timeEnd('old');
}

