# Supported Operators
+ **'*'** Kleene
+ **'.'** Concat
+ **'+'** Union

# Example
```javascript
let Lexer = require('./lexer');
let Parser = require('./parser');

let lex = new Lexer('(0+1)*.0');
let parser = new Parser(lex);
let ast = parser.parse();
console.log(JSON.stringify(ast, null, 3));
```
`ast` will have the following object:

```json
{
   "object": {
      "left": {
         "name": "kleene",
         "expression": {
            "left": {
               "name": "character",
               "value": "0"
            },
            "right": {
               "name": "character",
               "value": "1"
            },
            "name": "union"
         }
      },
      "right": {
         "name": "character",
         "value": "0"
      },
      "name": "concat"
   }
}
```
