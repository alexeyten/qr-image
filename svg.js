'use strict';

module.exports = svg;
module.exports.svgObject = svgObject;

const getOptions = require('./lib/options.js');
const QR = require('./lib/qr-base.js').QR;
const vectorize = require('./lib/vectorize.js');

function svgObject(text, options) {
    options = getOptions(options, 'svg');
    const matrix = QR(text, options.ec_level, options.parse_url);
    const margin = options.margin;
    const path = vectorize(matrix).map((part) => (
        part.map((item) => (
            item[0] === 'M' ? `M${item[1] + margin} ${item[2] + margin}` : item.join('')
        )).join('') + 'z'
    )).join('');

    return {
        size: matrix.length + 2 * margin,
        path: path
    };
}

function svg(text, options) {
    const data = svgObject(text, options);

    const imageSize = (options && options.size > 0) ? options.size * data.size : 0;
    const svgSize = imageSize ? `width="${imageSize}" height="${imageSize}" ` : '';

    const viewBox = `viewBox="0 0 ${data.size} ${data.size}"`;

    return `<svg xmlns="http://www.w3.org/2000/svg" ${svgSize}${viewBox}><path d="${data.path}"/></svg>`;
}
