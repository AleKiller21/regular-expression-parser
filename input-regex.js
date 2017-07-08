'use strict';

let Symbol = require('./symbol');

class InputRegex {
    constructor(regex) {
        this.regex = regex;
        this.col = 1;
        this.iterator = 0;
        this.currentSymbol = regex[0];
    }

    getNextSymbol() {
        if(this.iterator === this.regex.length) return new Symbol(this.col, '$');
        return new Symbol(this.col++, this.regex[this.iterator++]);
    }
}

module.exports = InputRegex;