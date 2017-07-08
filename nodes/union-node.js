
let BinaryOp = require('./binary-operator');

class Union extends BinaryOp {
    constructor(left, right) {
        super(left, right);
        this.name = 'union';
    }
}

module.exports = Union;