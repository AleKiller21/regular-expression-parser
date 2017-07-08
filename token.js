'use strict';

class Token {
    constructor(lexeme, type, col) {
        this.lexeme = lexeme;
        this.type = type;
        this.col = col;
    }
}

module.exports = Token;