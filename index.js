'use strict';

let Parser = require('./parser');

let parser = new Parser('(0+1)*.0');
let ast = parser.parse();
console.log(JSON.stringify(ast, null, 3));