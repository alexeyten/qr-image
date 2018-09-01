"use strict";

var zlib = require('zlib');

var crc32 = require('./crc32');

var PNG_HEAD  = new Buffer.from([137,80,78,71,13,10,26,10]);
var PNG_IHDR  = new Buffer.from([0,0,0,13,73,72,68,82,0,0,0,0,0,0,0,0,8,3,0,0,0,0,0,0,0]);  // PNG_IHDR[17] = 3, meaning Index color
var PNG_IDAT  = new Buffer.from([0,0,0,0,73,68,65,84]);
var PNG_IEND  = new Buffer.from([0,0,0,0,73,69,78,68,174,66,96,130]);

// Palette chunk for indexed color image. 
// PNG_PLTE[8,9,10] = R,G,B of color #0 (Foreground); default = [0,0,0] i.e. black
// PNG_PLTE[11,12,13] = R,G,B of color #1 (Background) default = [255,255,255] i.e. white
var PNG_PLTE  = new Buffer.from([0,0,0,6,0x50,0x4c,0x54,0x45,0,0,0,255,255,255,0,0,0,0]);

// Transparency chunk for indexed color image.
// PNG_tRNS[8]=transparency of color #0
// PNG_tRNS[9]=transparency of color #1
var PNG_tRNS  = new Buffer.from([0,0,0,2,0x74,0x52,0x4e,0x53,0xff,0x00,0,0,0,0]);

function png(bitmap, stream, foreColor, backColor, transparent) {
    stream.push(PNG_HEAD);

    var IHDR = Buffer.concat([PNG_IHDR]);
    IHDR.writeUInt32BE(bitmap.size, 8);
    IHDR.writeUInt32BE(bitmap.size, 12);
    IHDR.writeUInt32BE(crc32(IHDR.slice(4, -4)), 21);
    stream.push(IHDR);

    // Pallete chunk
    var PLTE = Buffer.concat([PNG_PLTE]);
    if (foreColor) foreColor.copy(PLTE,  8);
    if (backColor) backColor.copy(PLTE, 11);
    PLTE.writeUInt32BE(crc32(PLTE.slice(4, -4)), PLTE.length - 4);
    stream.push(PLTE);

    if (transparent){
        var tRNS = Buffer.concat([PNG_tRNS]);
        tRNS.writeUInt32BE(crc32(tRNS.slice(4, -4)), tRNS.length - 4);
        stream.push(tRNS);
    }

    var IDAT = Buffer.concat([
        PNG_IDAT,
        zlib.deflateSync(bitmap.data, { level: 9 }),
        new Buffer.alloc(4)
    ]);
    IDAT.writeUInt32BE(IDAT.length - 12, 0);
    IDAT.writeUInt32BE(crc32(IDAT.slice(4, -4)), IDAT.length - 4);
    stream.push(IDAT);

    stream.push(PNG_IEND);
    stream.push(null);
}

function bitmap(matrix, size, margin) {
    var N = matrix.length;
    var X = (N + 2 * margin) * size;
    var data = new Buffer.alloc((X + 1) * X);
    data.fill(1);   // We are writing color INDEX now, not gray value! (Was: data.fill(255); )
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
    png: png
}
