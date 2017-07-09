# Supported Operators
+ **'*'** Kleene
+ **'.'** Concat
+ **'+'** Union

# Example
```javascript
let Parser = require('./parser');

let parser = new Parser('(0+1)*.0');
let ast = parser.parse();
console.log(JSON.stringify(ast, null, 3));
```
`ast` will have the following object:

```json
{
   "object": {
      "name": "concat",
      "left": {
         "name": "kleene",
         "expression": {
            "name": "union",
            "left": {
               "name": "character",
               "value": "0"
            },
            "right": {
               "name": "character",
               "value": "1"
            }
         }
      },
      "right": {
         "name": "character",
         "value": "0"
      }
   }
}
```
