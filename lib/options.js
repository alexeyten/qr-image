'use strict';

module.exports = getOptions;

const PNG_OPTIONS = {
    parse_url: false,
    ec_level: 'M',
    size: 5,
    margin: 4,
    customize: null
};

const VECTOR_OPTIONS = {
    parse_url: false,
    ec_level: 'M',
    margin: 1,
    size: 0
};

function getOptions(options, forceType) {
    if (typeof options === 'string') {
        options = { ec_level: options };
    }
    options = options || {};

    const _options = {
        type: String(forceType || options.type || 'png').toLowerCase()
    };

    Object.assign(_options, _options.type === 'png' ? PNG_OPTIONS : VECTOR_OPTIONS);

    for (const k in _options) {
        if (k in options) {
            _options[k] = options[k];
        }
    }

    return _options;
}
