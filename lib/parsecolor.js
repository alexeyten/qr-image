"use strict";


// Source: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value
var cssTable = {
	black:	"#000000",
	silver:	"#c0c0c0",
	gray:	"#808080",
	white:	"#ffffff",
	maroon:	"#800000",
	red:	"#ff0000",
	purple:	"#800080",
	fuchsia:	"#ff00ff",
	green:	"#008000",
	lime:	"#00ff00",
	olive:	"#808000",
	yellow:	"#ffff00",
	navy:	"#000080",
	blue:	"#0000ff",
	teal:	"#008080",
	aqua:	"#00ffff",
	orange:	"#ffa500",
	aliceblue:	"#f0f8ff",
	antiquewhite:	"#faebd7",
	aquamarine:	"#7fffd4",
	azure:	"#f0ffff",
	beige:	"#f5f5dc",
	bisque:	"#ffe4c4",
	blanchedalmond:	"#ffebcd",
	blueviolet:	"#8a2be2",
	brown:	"#a52a2a",
	burlywood:	"#deb887",
	cadetblue:	"#5f9ea0",
	chartreuse:	"#7fff00",
	chocolate:	"#d2691e",
	coral:	"#ff7f50",
	cornflowerblue:	"#6495ed",
	cornsilk:	"#fff8dc",
	crimson:	"#dc143c",
	cyan:	"#00ffff",
	darkblue:	"#00008b",
	darkcyan:	"#008b8b",
	darkgoldenrod:	"#b8860b",
	darkgray:	"#a9a9a9",
	darkgreen:	"#006400",
	darkgrey:	"#a9a9a9",
	darkkhaki:	"#bdb76b",
	darkmagenta:	"#8b008b",
	darkolivegreen:	"#556b2f",
	darkorange:	"#ff8c00",
	darkorchid:	"#9932cc",
	darkred:	"#8b0000",
	darksalmon:	"#e9967a",
	darkseagreen:	"#8fbc8f",
	darkslateblue:	"#483d8b",
	darkslategray:	"#2f4f4f",
	darkslategrey:	"#2f4f4f",
	darkturquoise:	"#00ced1",
	darkviolet:	"#9400d3",
	deeppink:	"#ff1493",
	deepskyblue:	"#00bfff",
	dimgray:	"#696969",
	dimgrey:	"#696969",
	dodgerblue:	"#1e90ff",
	firebrick:	"#b22222",
	floralwhite:	"#fffaf0",
	forestgreen:	"#228b22",
	gainsboro:	"#dcdcdc",
	ghostwhite:	"#f8f8ff",
	gold:	"#ffd700",
	goldenrod:	"#daa520",
	greenyellow:	"#adff2f",
	grey:	"#808080",
	honeydew:	"#f0fff0",
	hotpink:	"#ff69b4",
	indianred:	"#cd5c5c",
	indigo:	"#4b0082",
	ivory:	"#fffff0",
	khaki:	"#f0e68c",
	lavender:	"#e6e6fa",
	lavenderblush:	"#fff0f5",
	lawngreen:	"#7cfc00",
	lemonchiffon:	"#fffacd",
	lightblue:	"#add8e6",
	lightcoral:	"#f08080",
	lightcyan:	"#e0ffff",
	lightgoldenrodyellow:	"#fafad2",
	lightgray:	"#d3d3d3",
	lightgreen:	"#90ee90",
	lightgrey:	"#d3d3d3",
	lightpink:	"#ffb6c1",
	lightsalmon:	"#ffa07a",
	lightseagreen:	"#20b2aa",
	lightskyblue:	"#87cefa",
	lightslategray:	"#778899",
	lightslategrey:	"#778899",
	lightsteelblue:	"#b0c4de",
	lightyellow:	"#ffffe0",
	limegreen:	"#32cd32",
	linen:	"#faf0e6",
	magenta:	"#ff00ff",
	mediumaquamarine:	"#66cdaa",
	mediumblue:	"#0000cd",
	mediumorchid:	"#ba55d3",
	mediumpurple:	"#9370db",
	mediumseagreen:	"#3cb371",
	mediumslateblue:	"#7b68ee",
	mediumspringgreen:	"#00fa9a",
	mediumturquoise:	"#48d1cc",
	mediumvioletred:	"#c71585",
	midnightblue:	"#191970",
	mintcream:	"#f5fffa",
	mistyrose:	"#ffe4e1",
	moccasin:	"#ffe4b5",
	navajowhite:	"#ffdead",
	oldlace:	"#fdf5e6",
	olivedrab:	"#6b8e23",
	orangered:	"#ff4500",
	orchid:	"#da70d6",
	palegoldenrod:	"#eee8aa",
	palegreen:	"#98fb98",
	paleturquoise:	"#afeeee",
	palevioletred:	"#db7093",
	papayawhip:	"#ffefd5",
	peachpuff:	"#ffdab9",
	peru:	"#cd853f",
	pink:	"#ffc0cb",
	plum:	"#dda0dd",
	powderblue:	"#b0e0e6",
	rosybrown:	"#bc8f8f",
	royalblue:	"#4169e1",
	saddlebrown:	"#8b4513",
	salmon:	"#fa8072",
	sandybrown:	"#f4a460",
	seagreen:	"#2e8b57",
	seashell:	"#fff5ee",
	sienna:	"#a0522d",
	skyblue:	"#87ceeb",
	slateblue:	"#6a5acd",
	slategray:	"#708090",
	slategrey:	"#708090",
	snow:	"#fffafa",
	springgreen:	"#00ff7f",
	steelblue:	"#4682b4",
	tan:	"#d2b48c",
	thistle:	"#d8bfd8",
	tomato:	"#ff6347",
	turquoise:	"#40e0d0",
	violet:	"#ee82ee",
	wheat:	"#f5deb3",
	whitesmoke:	"#f5f5f5",
	yellowgreen:	"#9acd32",
	rebeccapurple:	"#663399"
	}
;

function f2(x){ 
	return x.toFixed(2); 
}

// zero pad string
function zp(s){
	return ('0'+s).slice(-2);
}

function clamp(x, min, max){
	return x <= min ? min : x >= max ? max : x; 
}

// for CMYK and gray values
function clamp01(x){
	return typeof x == 'number' ? clamp(x, 0, 1) : 0;
}

// for RGB values
function clamp0255(x){
	return typeof x == 'number' ? clamp(Math.round(x), 0, 255) : 0;
}


// Only used if cmyk color is passed to svg
// all parameters should be in 0..1 range
function cmyk2rgb(c, m, y, k) {
	let r = 1 - Math.min(1, c * (1 - k) + k);
	let g = 1 - Math.min(1, m * (1 - k) + k);
	let b = 1 - Math.min(1, y * (1 - k) + k);
  
	r = Math.round(r * 255);
	g = Math.round(g * 255);
	b = Math.round(b * 255);
	return {
		hex: '#'+ zp(r.toString(16))+ zp(g.toString(16))+ zp(b.toString(16)),	// for SVG
		raw: new Buffer.from([r,g,b]),	// for PNG
	}
}

// mapping hex color (or css color name) to  [r,g,b]
function hex2rgb(c) {

	var r$, g$, b$, r, g, b;

	// lookup in css color names first
	var s = cssTable[c];
	if (s) c = s;

	// remove '#' character if present
	if (c[0] == '#') c=c.substring(1);

	var a = c.split('');

	if (a.length == 3) {
		// Expand short notation: #rgb => #rrggbb
		r$ = a[0] + a[0];
		g$ = a[1] + a[1];
		b$ = a[2] + a[2];
	}
	else
		if (a.length >= 6) {
			// using >= 6 to allow for color string with transparency (#rrggbbaa).
			//  We are ignoring transparency (last two digits) here for now
			r$ = a[0] + a[1];
			g$ = a[2] + a[3];
			b$ = a[4] + a[5];
		}
		else
			return undefined;

	r = parseInt(r$, 16);
	g = parseInt(g$, 16);
	b = parseInt(b$, 16);

	if (isNaN(r) || isNaN(g) || isNaN(b))
		return undefined;
	
	return {
		rgbArr: [ r, g, b ],
		raw: new Buffer.from([r,g,b])
	}
}


function parseColor(color, type) {
	if (!color) return undefined;
	if (typeof color == 'string') {
		// hex (or named) color passed
		if (type == 'svg')
			return color;
		else if (type == 'png')
			return hex2rgb(color).raw;
		else{
			var s = hex2rgb(color).rgbArr;
			return s ? s.join(' ') + ' rg' : undefined;
		}
	}
	if (typeof color == 'number'){	
		// Gray color passed
		color=clamp01(color);
		if (type == 'svg'){
			var g=zp(Math.round( color*255).toString(16));
			return "#"+g+g+g;
		} else if (type == 'png'){
			var g = Math.round(color*255);
			return new Buffer.from([g,g,g]);
		}
		else
			return f2(color) + " g";
	}
	if (Array.isArray(color)){

		// RGB color passed,  each component in 0..255 range
		if (color.length == 3){
			color[0]=clamp0255(color[0]);
			color[1]=clamp0255(color[1]);
			color[2]=clamp0255(color[2]);
			if (type == 'svg')
				return '#'+ zp(color[0].toString(16))+ zp(color[1].toString(16))+ zp(color[2].toString(16));
			else if (type=='png')
				return new Buffer.from([color[0], color[1], color[2]]);
			else
				return  color.join(' ') + ' rg';
		}
		// CMYK color passed, each component in 0..1 range
		if (color.length == 4){
			color[0]=clamp01(color[0]);
			color[1]=clamp01(color[1]);
			color[2]=clamp01(color[2]);
			color[3]=clamp01(color[3]);
			if (type=='svg')
				return cmyk2rgb(color[0],color[1],color[2],color[3]).hex;
			else if (type=='png')
				return cmyk2rgb(color[0],color[1],color[2],color[3]).raw;
			else{
				return f2(color[0]) + ' ' + f2(color[1]) + ' ' + f2(color[2]) + ' ' + f2(color[3]) + ' k';
			}
		}
		throw new Error ("Invalid color model: got " + color.length + " components, expected 3 or 4.");
	}
	throw new Error ("Invalid color type: " + typeof color)

}

module.exports = {
	parser: parseColor
}