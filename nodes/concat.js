
let BinaryOp = require('./binary-operator');

class Concat extends BinaryOp{
    constructor(left, right) {
        super(left, right);
        this.name = 'concat';
    }
}

module.exports = Concat;