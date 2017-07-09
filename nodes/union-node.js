
let BinaryOp = require('./binary-operator');

class Union extends BinaryOp {
    constructor(left, right) {
        super(left, right, 'union');
    }
}

module.exports = Union;