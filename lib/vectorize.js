'use strict';

module.exports = vectorize;

function vectorize(matrix) {
    const N = matrix.length;
    const filled = [];
    for (let row = 0; row < N; row++) {
        filled[row] = new Uint8Array(N);
    }

    const path = [];
    for (let row = 0; row < N; row++) {
        for (let col = 0; col < N; col++) {
            if (filled[row][col]) {
                continue;
            }
            setFilled(row, col);
            if (isDark(row, col)) {
                if (!isDark(row - 1, col)) {
                    path.push(plot(row, col, 'right'));
                }
            } else {
                if (isDark(row, col - 1)) {
                    path.push(plot(row, col, 'down'));
                }
            }
        }
    }
    return path;

    function isDark(row, col) {
        if (row < 0 || col < 0 || row >= N || col >= N) {
            return false;
        }
        return !!matrix[row][col];
    }

    function setFilled(row, col) {
        if (row >= 0 && col >= 0 && row < N && col < N) {
            filled[row][col] = 1;
        }
    }

    function plot(row0, col0, dir) {
        const res = [];
        res.push([ 'M', col0, row0 ]);
        let row = row0;
        let col = col0;
        let len = 0;
        do {
            switch (dir) {
                case 'right':
                    setFilled(row, col);
                    if (isDark(row, col)) {
                        setFilled(row - 1, col);
                        if (isDark(row - 1, col)) {
                            res.push([ 'h', len ]);
                            len = 0;
                            dir = 'up';
                        } else {
                            len++;
                            col++;
                        }
                    } else {
                        res.push([ 'h', len ]);
                        len = 0;
                        dir = 'down';
                    }
                    break;
                case 'left':
                    setFilled(row - 1, col - 1);
                    if (isDark(row - 1, col - 1)) {
                        setFilled(row, col - 1);
                        if (isDark(row, col - 1)) {
                            res.push([ 'h', -len ]);
                            len = 0;
                            dir = 'down';
                        } else {
                            len++;
                            col--;
                        }
                    } else {
                        res.push([ 'h', -len ]);
                        len = 0;
                        dir = 'up';
                    }
                    break;
                case 'down':
                    setFilled(row, col - 1);
                    if (isDark(row, col - 1)) {
                        setFilled(row, col);
                        if (isDark(row, col)) {
                            res.push([ 'v', len ]);
                            len = 0;
                            dir = 'right';
                        } else {
                            len++;
                            row++;
                        }
                    } else {
                        res.push([ 'v', len ]);
                        len = 0;
                        dir = 'left';
                    }
                    break;
                case 'up':
                    setFilled(row - 1, col);
                    if (isDark(row - 1, col)) {
                        setFilled(row - 1, col - 1);
                        if (isDark(row - 1, col - 1)) {
                            res.push([ 'v', -len ]);
                            len = 0;
                            dir = 'left';
                        } else {
                            len++;
                            row--;
                        }
                    } else {
                        res.push([ 'v', -len ]);
                        len = 0;
                        dir = 'right';
                    }
                    break;
            }
        } while (row !== row0 || col !== col0);
        return res;
    }
}
