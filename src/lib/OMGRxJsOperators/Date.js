
const Operators = require('rxjs/operators');

const parseDate = (targetDate) => {
    if (targetDate instanceof Date) {
        return targetDate;
    }

    return new Date(targetDate);
};

exports.greaterThan = (targetDate) => {
    const localTargetDate = parseDate(targetDate);
    return Operators.filter(item => item > localTargetDate);
};

exports.greaterThanEqual = (targetDate) => {
    const localTargetDate = parseDate(targetDate);
    return Operators.filter(item => item >= localTargetDate);
};

exports.lessThan = (targetDate) => {
    const localTargetDate = parseDate(targetDate);
    return Operators.filter(item => item < localTargetDate);
};

exports.lessThanEqual = (targetDate) => {
    const localTargetDate = parseDate(targetDate);
    return Operators.filter(item => item <= localTargetDate);
};
