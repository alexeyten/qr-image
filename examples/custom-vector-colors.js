var fs =require("fs");
var qr = require( 'qr-image');

var cmykLtGreen = [0.5, 0, 0.3, 0];            // 50% Cyan, 30% Yellow
var cmykWhite   = [0, 0, 0, 0];
var cmykDkBlue  = [1, 0.6, 0, 0.35];           // 100% Cyan, 60% Magenta, 35% Black
var cmykLtCoolGray   = [0.05, 0, 0, 0.07];     // 5% Cyan, 7% Black

var rgbGray = [64, 64, 64];


var pdf=fs.createWriteStream('test.pdf');
qr.image("TEST Custom Color PDF", {type: 'pdf', color: cmykLtGreen, background: cmykWhite, transparent: false }).pipe(pdf);

var eps=fs.createWriteStream('test.eps');
qr.image("TEST Custom Color EPS", {type: 'eps' , color: cmykDkBlue, background: cmykLtCoolGray, transparent: false }).pipe(eps);

// For svg, any valid css string can be passed
// **Note: Illustrator and Inkscape do not play well with rgba(), hsv(), hsva() etc.
// If you need to open in those, use css name or #RRGGBB notation.
// If you want transparent background, just ommit 'background' property or set it to null.
var svg=fs.createWriteStream('test.svg');
qr.image("TEST Custom Color SVG", {type: 'svg', color: "fuchsia", transparent: false }).pipe(svg);


var png=fs.createWriteStream('test.png');
qr.image("TEST Transparent PNG File", {type: 'png', transparent: true }).pipe(png);