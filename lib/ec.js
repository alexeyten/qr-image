'use strict';
/**
 * Stick to `var` https://github.com/nodejs/node/issues/5815
 */

// {{{1 Galois Field Math
// GF(256) with pp=285

// Max LOG value is 254. Max index for EXP is poly[i] + log[k] < 509
var EXP = new Uint8Array(509);
var LOG = new Uint8Array(256);
var i, n;

EXP[0] = 1;
for (EXP[0] = 1, i = 1; i < 255; i++) {
    n = EXP[i - 1] << 1;
    if (n > 255) n = n ^ 285;
    EXP[i] = n;
    LOG[n] = i;
}
EXP.copyWithin(255, 0, 254);

// {{{1 Generator Polynomials
var POLYNOMIALS = [
    // new Uint8Array([/* 0 */]),     // a^0 x^0 never used
    new Uint8Array([/* 0, */ 0]),     // a^0 x^1 + a^0 x^0
    new Uint8Array([/* 0, */ 25, 1]), // a^0 x^2 + a^25 x^1 + a^1 x^0
    // and so on...
];

function generatorPolynomial(num) {
    var N = num - 1;
    if (POLYNOMIALS.length > N) {
        return POLYNOMIALS[N];
    }
    var prev = generatorPolynomial(N);
    var res = POLYNOMIALS[N] = new Uint8Array(num);
    res[0] = LOG[EXP[prev[0]] ^ EXP[N]];

    for (var i = 1; i < num; i++) {
        res[i] = LOG[EXP[prev[i]] ^ EXP[prev[i - 1] + N]];
    }
    return res;
}

// {{{1 export functions
module.exports = function calculate_ec(message, ec_len) {
    var msg = new Uint8Array(message.length + ec_len);
    msg.set(message);

    // Generator Polynomial
    var poly = generatorPolynomial(ec_len);

    for (var k = 0; k < msg.length - ec_len; k++) {
        if (msg[k] === 0) continue;

        var log_k = LOG[msg[k]];
        for (var i = 0; i < ec_len; i++) {
            msg[k + i + 1] ^= EXP[poly[i] + log_k];
        }
    }

    return msg.slice(-ec_len);
}
