
let TokenType = require('./token-type');
let Union = require('./nodes/union-node');
let Concat = require('./nodes/concat');
let Closure = require('./nodes/closure');
let Character = require('./nodes/character');
let Lexer = require('./lexer');

class Parser {
    constructor(regex) {
        this.lexer = new Lexer(regex);
        this.currentToken = this.lexer.getNextToken();
    }

    parse() {
        let expression = this.expression();
        if(!this.checkTokenType(TokenType.EOF))
            throw `End of file expected at column ${this.getTokenCol()}`;
        
        return {
            object: expression
        }
    }

    expression() {
        return this.union();
    }

    union() {
        return this.unionPrime(this.concat());
    }

    unionPrime(leftValue) {
        if(this.checkTokenType(TokenType.OP_UNION)) {
            this.nextToken();
            let rightValue = this.concat();
            return this.unionPrime(new Union(leftValue, rightValue));
        }

        else return leftValue;
    }

    concat() {
        return this.concatPrime(this.closure());
    }

    concatPrime(leftValue) {
        if(this.checkTokenType(TokenType.OP_CONCAT)) {
            this.nextToken();
            let rightValue = this.closure();
            return this.concatPrime(new Concat(leftValue, rightValue));
        }

        else return leftValue;
    }

    closure() {
        return this.closurePrime(this.primaryExpression());
    }

    closurePrime(leftValue) {
        if(this.checkTokenType(TokenType.OP_CLOSURE)) {
            this.nextToken();
            return new Closure(leftValue);
        }

        else return leftValue;
    }

    primaryExpression() {
        if(this.checkTokenType(TokenType.CHARACTER)) {
            let characterNode = new Character(this.getTokenLexeme());
            this.nextToken();
            return characterNode;
        }

        else if(this.checkTokenType(TokenType.PARENTHESIS_OPEN)) {
            this.nextToken();
            let expression = this.expression();
            if(!this.checkTokenType(TokenType.PARENTHESIS_CLOSE)) {
                throw `')' token expected at column ${this.getTokenCol()}`;
            }

            this.nextToken();
            return expression;
        }

        else {
            throw `character or '(' expected at column ${this.getTokenCol()}`;
        }
    }

    getTokenLexeme() {
        return this.currentToken.lexeme;
    }

    checkTokenType(tokenType) {
        return this.currentToken.type === tokenType;
    }

    nextToken() {
        this.currentToken = this.lexer.getNextToken();
    }

    getTokenCol() {
        return this.currentToken.col;
    }
}

module.exports = Parser;