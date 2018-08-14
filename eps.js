'use strict';

module.exports = eps;

const getOptions = require('./lib/options.js');
const QR = require('./lib/qr-base.js').QR;
const vectorize = require('./lib/vectorize.js');

function eps(text, options) {
    options = getOptions(options, 'eps');

    const matrix = QR(text, options.ec_level, options.parse_url);

    const margin = options.margin;
    const scale = 9;
    const N = matrix.length;
    const X = (N + 2 * margin) * scale;

    const data = [
        '%!PS-Adobe-3.0 EPSF-3.0',
        `%%BoundingBox: 0 0 ${X} ${X}`,
        '/h { 0 rlineto } bind def',
        '/v { 0 exch neg rlineto } bind def',
        `/M { neg ${N + margin} add moveto } bind def`,
        '/z { closepath } bind def',
        `${scale} ${scale} scale`
    ];

    vectorize(matrix).forEach((part) => {
        data.push(
            part.map((item) => (
                item[0] === 'M' ? `${item[1] + margin} ${item[2]} M` : `${item[1]} ${item[0]}`
            )).join(' ') + ' z'
        );
    });

    data.push('fill', '%%EOF', '');

    return data.join('\n');
}
