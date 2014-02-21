"use strict";

var zlib = require('zlib');
var crc32 = require('./crc32');

function PNG(bitmap, stream) {
    var IHDR = Buffer([0,0,0,13,73,72,68,82,119,119,119,119,104,104,104,104,8,0,0,0,0,0,0,0,0]);
    IHDR.writeUInt32BE(bitmap.size, 8);
    IHDR.writeUInt32BE(bitmap.size, 12);
    IHDR.writeUInt32BE(crc32(IHDR.slice(4, -4)), 21);

    var IDAT = [ Buffer([0,0,0,0,73,68,65,84]) ];

    zlib.createDeflate({level:9}).on('data', function(chunk) {
        IDAT.push(chunk);
    }).on('end', function() {
        stream.push(Buffer([137,80,78,71,13,10,26,10]));
        stream.push(IHDR);

        IDAT.push(Buffer(4));
        IDAT = Buffer.concat(IDAT);
        IDAT.writeUInt32BE(IDAT.length - 12, 0);
        IDAT.writeUInt32BE(crc32(IDAT.slice(4, -4)), IDAT.length - 4);
        stream.push(IDAT);

        stream.push(Buffer([0,0,0,0,73,69,78,68,174,66,96,130]));
        stream.push(null);
    }).end(bitmap.data);
}

function bitmap(matrix, size, margin) {
    var N = matrix.length;
    var X = (N + 2 * margin) * size;
    var data = Buffer((X + 1) * X);
    data.fill(255);
    for (var i = 0; i < X; i++) {
        data[i * (X + 1)] = 0;
    }

    for (var i = 0; i < N; i++) {
        for (var j = 0; j < N; j++) {
            if (matrix[i][j]) {
                var offset = ((margin + i) * (X + 1) + (margin + j)) * size + 1;
                data.fill(0, offset, offset + size);
                for (var c = 1; c < size; c++) {
                    data.copy(data, offset + c * (X + 1), offset, offset + size);
                }
            }
        }
    }

    return {
        data: data,
        size: X
    }
}

module.exports = {
    bitmap: bitmap,
    PNG: function(matrix, size, margin, stream) {
        if (matrix.data && matrix.size) {
            stream = size;
            PNG(matrix, stream);
            return;
        }
        size = size || 5;
        margin = margin || 4;
        PNG(bitmap(matrix, size, margin), stream);
    }
}
