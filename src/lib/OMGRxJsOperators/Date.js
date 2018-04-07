
const Operators = require('rxjs/operators');

exports.greaterThan = (targetDate) => Operators.filter(item => item > targetDate);

exports.greaterThanEqual = (targetDate) => Operators.filter(item => item >= targetDate);

exports.lessThan = (targetDate) => Operators.filter(item => item < targetDate);

exports.lessThanEqual = (targetDate) => Operators.filter(item => item <= targetDate);
