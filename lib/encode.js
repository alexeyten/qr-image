"use strict";

var util = require('util');

/**
 * Choose encode mode and generates struct
 * with data for different version
 *
 * For now mode is always 8-bit
 */
function encode(data) {
    // Malke sure data is Buffer
    if (!Buffer.isBuffer(data)) {
        if (util.isArray(data)) {
            data = Buffer(data);
        } else {
            data = Buffer('' + data);
        }
    }

    var len = data.length;
    var res = {};
    var data1 = res.data1 = Buffer(len + 2);
    var data10 = res.data10 = res.data27 = Buffer(len + 3);
    data10.writeUInt16BE(0x4000 | (len >> 4), 0);
    data10[2] = (len << 4) | (data[0] >> 4);
    for (var i = 0; i < len - 1; i++) {
        data10[i + 3] = (data[i] << 4) | (data[i + 1] >> 4);
    }
    data10[len + 2] = data[len - 1] << 4;

    if (len < 256) {
        data1[0] = 0x40 | (len >> 4);
        data10.copy(data1, 1, 2);
    }

    return res;
}

module.exports = encode;
