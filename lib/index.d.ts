// Type definitions for qr-image-color 3.2.1
// Project: https://github.com/bockoblur/qr-image-color
// Definitions by: bockoblur <https://github.com/bockoblur>

/// <reference types="node" />

/**
 * error correction level. One of L, M, Q, H. Default M.
 */
export type ec_level = 'L' | 'M' | 'Q' | 'H';

export type color_type = string | number | number[] | Buffer;

/** @default 'png' */
export type image_type = 'png' | 'svg' | 'pdf' | 'eps';

export interface Options {
	ec_level?: ec_level;	// error correction level. One of L, M, Q, H. Default M.
	type?: image_type;		// image type. Possible values png(default), svg, pdf and eps.
	size?: number;		// (png and svg only) for png and undefined for svg.-(png and svg only) — size of one module in pixels.
	margin?: number;		// (only png)for png and 1 for others.-white space around QR image in modules.
	parse_url?: boolean;	// (experimental, default false) try to optimize QR-code for URLs.
	// New properties for this fork
	color? : color_type;		// foreground color (default: black)
	background?: color_type;	// background color (default: white)
	transparent?: boolean;		// transparent background (default: true for vector formats, false for png)
}

export function image(text: string, level?: ec_level): NodeJS.ReadableStream;
export function image(text: string, options?: Options): NodeJS.ReadableStream;

export function imageSync(text: string, level?: ec_level): Buffer;
export function imageSync(text: string, options?: Options): string | Buffer;

export function svgObject(text: string, level?: ec_level): any;
export function svgObject(text: string, options?: Options): any;

export function matrix(text: string, level?: ec_level): any[][];
