'use strict';

let InputRegex = require('./input-regex');
let TokenType = require('./token-type');
let Token = require('./token');

const charRegex = /[a-z0-9]/i

class Lexer {
    constructor(regex) {
        this.inputRegex = new InputRegex(regex);
        this.currentSymbol = this.inputRegex.getNextSymbol();
    }

    getTokens() {
        let tokens = [];
        let currentToken = this.getNextToken();
        while(currentToken.type !== TokenType.EOF) {
            tokens.push(currentToken);
            currentToken = this.getNextToken();
        }

        return tokens;
    }

    getNextToken() {
        while(this.currentSymbol.char === ' ') this.nextSymbol();

        if(this.currentSymbol.char === '$') {
            return this.buildToken(TokenType.EOF);
        }

        if(this.isSymbolCharacter()) {
            let token = this.buildToken(TokenType.CHARACTER);
            this.nextSymbol();
            return token;
        }

        if(this.currentSymbol.char === '*') {
            let token = this.buildToken(TokenType.OP_CLOSURE);
            this.nextSymbol();
            return token;
        }

        if(this.currentSymbol.char === '.') {
            let token = this.buildToken(TokenType.OP_CONCAT);
            this.nextSymbol();
            return token;
        }

        if(this.currentSymbol.char === '+') {
            let token = this.buildToken(TokenType.OP_UNION);
            this.nextSymbol();
            return token;
        }

        if(this.currentSymbol.char === '(') {
            let token = this.buildToken(TokenType.PARENTHESIS_OPEN);
            this.nextSymbol();
            return token;
        }

        if(this.currentSymbol.char === ')') {
            let token = this.buildToken(TokenType.PARENTHESIS_CLOSE);
            this.nextSymbol();
            return token;
        }

        throw `Unrecognized token at column ${this.currentSymbol.col}`;
    }

    buildToken(tokenType) {
        let char = this.currentSymbol.char;
        let col = this.currentSymbol.col;
        return new Token(char, tokenType, col);
    }

    nextSymbol() {
        this.currentSymbol = this.inputRegex.getNextSymbol();
    }

    isSymbolCharacter() {
        return this.currentSymbol.char.match(charRegex);
    }
}

module.exports = Lexer;
