
const Operators = require('rxjs/operators');

const parseDate = (targetDate) => {
    if (targetDate instanceof Date) {
        return targetDate;
    }

    return new Date(targetDate);
};

exports.greaterThan = (targetDate) => {
    let localTargetDate = parseDate(targetDate);
    return Operators.filter(item => item > localTargetDate);
};

exports.greaterThanEqual = (targetDate) => {
    let localTargetDate = parseDate(targetDate);
    return Operators.filter(item => item >= localTargetDate);
};

exports.lessThan = (targetDate) => {
    let localTargetDate = parseDate(targetDate);
    return Operators.filter(item => item < localTargetDate);
};

exports.lessThanEqual = (targetDate) => {
    let localTargetDate = parseDate(targetDate);
    return Operators.filter(item => item <= localTargetDate);
};
