"use strict";

function pushBits(arr, n, value) {
    for (var bit = 1 << (n - 1); bit; bit = bit >>> 1) {
        arr.push(bit & value ? 1 : 0);
    }
}

// {{{1 8bit encode
function encode_8bit(data) {
    var len = data.length;
    var bits = [];

    for (var i = 0; i < len; i++) {
        pushBits(bits, 8, data[i]);
    }

    var res = {};

    var d = [0, 1, 0, 0];
    pushBits(d, 16, len);
    res.data10 = res.data27 = d.concat(bits);

    if (len < 256) {
        var d = [0, 1, 0, 0];
        pushBits(d, 8, len);
        res.data1 = d.concat(bits);
    }

    return res;
}

// {{{1 numeric encode
function encode_numeric(str) {
    var len = str.length;
    var bits = [];

    for (var i = 0; i < len; i += 3) {
        var s = str.substr(i, 3);
        var b = Math.ceil(s.length * 10 / 3);
        pushBits(bits, b, parseInt(s, 10));
    }

    var res = {};

    var d = [0, 0, 0, 1];
    pushBits(d, 14, len);
    res.data27 = d.concat(bits);

    if (len < 4096) {
        var d = [0, 0, 0, 1];
        pushBits(d, 12, len);
        res.data10 = d.concat(bits);
    }

    if (len < 1024) {
        var d = [0, 0, 0, 1];
        pushBits(d, 10, len);
        res.data1 = d.concat(bits);
    }

    return res;
}

// {{{1 Choose encode mode and generates struct with data for different version
function encode(data) {
    var str;
    var t = typeof data;

    if (t == 'string' || t == 'number') {
        str = '' + data;
        data = Buffer(str);
    } else if (Buffer.isBuffer(data)) {
        str = data.toString();
    } else if (Array.isArray(data)) {
        data = Buffer(data);
        str = data.toString();
    } else {
        throw new Error("Bad data");
    }

    if (/^[0-9]+$/.test(str)) {
        if (data.length > 7100) {
            throw new Error("Too much data");
        }
        return encode_numeric(str);
    }

    if (data.length > 3000) {
        throw new Error("Too much data");
    }
    return encode_8bit(data);
}

// {{{1 export functions
module.exports = encode;
