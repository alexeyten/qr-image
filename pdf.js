'use strict';

module.exports = pdf;

const getOptions = require('./lib/options.js');
const QR = require('./lib/qr-base.js').QR;
const vectorize = require('./lib/vectorize.js');

function pdf(text, options) {
    options = getOptions(options, 'pdf');

    const matrix = QR(text, options.ec_level, options.parse_url);

    const margin = options.margin;
    const scale = 9;
    const N = matrix.length;
    const X = (N + 2 * margin) * scale;

    const path = `${scale} 0 0 ${scale} 0 0 cm\n` +
        vectorize(matrix).map((subpath) => {
            let res = '';
            for (let k = 0, x, y; k < subpath.length; k++) {
                const item = subpath[k];
                switch (item[0]) {
                    case 'M':
                        x = item[1] + margin;
                        y = N - item[2] + margin;
                        res += `${x} ${y} m `;
                        break;
                    case 'h':
                        x += item[1];
                        res += `${x} ${y} l `;
                        break;
                    case 'v':
                        y -= item[1];
                        res += `${x} ${y} l `;
                        break;
                }
            }
            res += 'h';
            return res;
        }).join('\n') + '\nf\n';

    const data = [
        '%PDF-1.0\n\n',
        '1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj\n',
        '2 0 obj << /Type /Pages /Count 1 /Kids [ 3 0 R ] >> endobj\n',
        `3 0 obj << /Type /Page /Parent 2 0 R /Resources <<>> /Contents 4 0 R /MediaBox [ 0 0 ${X} ${X} ] >> endobj\n`,
        `4 0 obj << /Length ${path.length} >> stream\n${path}endstream\nendobj\n`
    ];

    const refs = data.slice(1, 5).reduce((acc, item) => {
        acc.xref += ('0000000000' + acc.len).substr(-10) + ' 00000 n \n';
        acc.len += item.length;
        return acc;
    }, {
        xref: 'xref\n0 5\n0000000000 65535 f \n',
        len: data[0].length
    });

    data.push(
        refs.xref,
        'trailer << /Root 1 0 R /Size 5 >>\n',
        `startxref\n${refs.len}\n%%EOF\n`
    );

    return data.join('');
}
