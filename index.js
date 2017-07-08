
let Lexer = require('./lexer');
let Parser = require('./parser');

let lex = new Lexer('(0+1)*.0');
let parser = new Parser(lex);
let ast = parser.parse();
console.log(JSON.stringify(ast, null, 4));