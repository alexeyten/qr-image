cf-qr-image
========
This is a fork of [qr-image](https://github.com/alexeyten/qr-image) that works on CloudFlare Workers. It replaces the CommonJS `require` with ES6 `import` and updates all dependencies to use the new `node:<module>` import syntax. It also removes the `zlib` dependency and replaces it with `pako` to work around the lack of `zlib` in CloudFlare Workers.

This is yet ~~another~~ the best Cloudflare QR Code generator.

Overview
--------

  * ~~No dependecies~~ Only `pako` for CloudFlare Workers, because `zlib` is not available;
  * generate image in `png`, `svg`, `eps` and `pdf` formats;
  * numeric and alphanumeric modes;
  * support UTF-8.


Installing
-----

```shell
npm install git+git@github.com:SteffTek/cf-qr-image.git#main
```
Maybe I'll publish it to npm at some point, but for now you'll have to use the git URL.

Usage
-----

Example:
```typescript
import qr from 'qr-image';
const qr_svg = qr.imageSync('I love QR!', { type: 'svg' });
```

### Methods

  * `qr.image(text, [ec_level | options])` — Readable stream with image data;
  * `qr.imageSync(text, [ec_level | options])` — string with image data. (Buffer for `png`);
  * `qr.svgObject(text, [ec_level | options])` — object with SVG path and size;
  * `qr.matrix(text, [ec_level])` — 2D array of booleans. __Y__ is indexed first (e.g. `[y][x]` NOT `[x][y]`), `[0][0]` is the top left, and `true` means black.


### Options

  * `text` — text to encode;
  * `ec_level` — error correction level. One of `L`, `M`, `Q`, `H`. Default `M`.
  * `options` — image options object:
    * `ec_level` — default `M`.
    * `type` — image type. Possible values `png` (default), `svg`, `pdf` and `eps`.
    * `size` (png and svg only) — size of one module in pixels. Default `5` for png and `undefined` for svg.
    * `margin` — white space around QR image in modules. Default `4` for `png` and `1` for others.
    * `customize` (only png) — function to customize qr bitmap before encoding to PNG.
    * `parse_url` (experimental, default `false`) — try to optimize QR-code for URLs.

Changes
-------

  * ~~Use `zlib.deflateSync` instead of `pako`.~~ Use `pako` instead of `zlib` to work around the lack of `zlib` in CloudFlare Workers.


TODO
----

  * Tests;
  * mixing modes;
  * Kanji (???).
