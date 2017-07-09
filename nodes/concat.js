
let BinaryOp = require('./binary-operator');

class Concat extends BinaryOp{
    constructor(left, right) {
        super(left, right, 'concat');
    }
}

module.exports = Concat;