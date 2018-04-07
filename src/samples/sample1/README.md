
# RxJs sample of custom date filter operator

## Lettable operators

I use to filter dates some custom lettable operators defined as pure high-order functions. These pure functions are side effect-free and can be used in function chains. It's important that the operators are side effect-free because an observable ecosystem begins with a subscription and ends with a disposal. Otherwise the observable is no longer stateless and the lifecycles of the state and the observable are dependent on each other. See the benefits of lettable operators reading [this](https://github.com/ReactiveX/rxjs/blob/master/doc/pipeable-operators.md).

My custom sample operators are located in [lib/OMGRxJsOperators/Date.js](https://github.com/elmao79/rxjs-samples/blob/master/src/lib/OMGRxJsOperators/Date.js).
```js
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
```
Rather than patch operators into `Observable.prototype`, lettable operators can be imported into the modules and re-used easily. Now, thanks to RxJS 5.5 observables have a pipe method that lets call our pure functions operators building a composition of operators.

```js
const Rx = require('rxjs/Rx');
const DateOperators = require('../../lib/OMGRxJsOperators/Date');

// I generate an array with a full year dates.
const getFullYearDates = (year) => {
    let dates = [];
    const fromDate = new Date(`${year}-01-01`);
    let currDate = new Date(fromDate);
    dates.push(currDate);
    for (let i = 0; i < 364; i += 1) {
        currDate = new Date(+(currDate) + 86400000);
        dates.push(currDate);
    }

    return dates;
};
const dates = getFullYearDates(2017);

const sub$ = Rx.Observable.from(dates);
Rx.Observable
    .forkJoin(
        // Getting February dates
        sub$
            .pipe(
                DateOperators.greaterThanEqual('2017-02-01'),
                DateOperators.lessThanEqual('2017-02-28')
            )
            .reduce((acc, curr) => [...acc, curr], []),
        // Getting April dates minus first and last date of month
        sub$
            .pipe(
                DateOperators.greaterThan('2017-04-01'),
                DateOperators.lessThan('2017-04-30')
            )
            .reduce((acc, curr) => [...acc, curr], []),
    )
    .subscribe(
        item => console.log(item),
        err => console.log(err),
        () => console.log('Streams completed')
    );
```

Running the sample:
```sh
node sample1.js
```
Output
```none
[ [ 2017-02-01T00:00:00.000Z,
    2017-02-02T00:00:00.000Z,
    2017-02-03T00:00:00.000Z,
    2017-02-04T00:00:00.000Z,
    2017-02-05T00:00:00.000Z,
    2017-02-06T00:00:00.000Z,
    2017-02-07T00:00:00.000Z,
    2017-02-08T00:00:00.000Z,
    2017-02-09T00:00:00.000Z,
    2017-02-10T00:00:00.000Z,
    2017-02-11T00:00:00.000Z,
    2017-02-12T00:00:00.000Z,
    2017-02-13T00:00:00.000Z,
    2017-02-14T00:00:00.000Z,
    2017-02-15T00:00:00.000Z,
    2017-02-16T00:00:00.000Z,
    2017-02-17T00:00:00.000Z,
    2017-02-18T00:00:00.000Z,
    2017-02-19T00:00:00.000Z,
    2017-02-20T00:00:00.000Z,
    2017-02-21T00:00:00.000Z,
    2017-02-22T00:00:00.000Z,
    2017-02-23T00:00:00.000Z,
    2017-02-24T00:00:00.000Z,
    2017-02-25T00:00:00.000Z,
    2017-02-26T00:00:00.000Z,
    2017-02-27T00:00:00.000Z,
    2017-02-28T00:00:00.000Z ],
  [ 2017-04-02T00:00:00.000Z,
    2017-04-03T00:00:00.000Z,
    2017-04-04T00:00:00.000Z,
    2017-04-05T00:00:00.000Z,
    2017-04-06T00:00:00.000Z,
    2017-04-07T00:00:00.000Z,
    2017-04-08T00:00:00.000Z,
    2017-04-09T00:00:00.000Z,
    2017-04-10T00:00:00.000Z,
    2017-04-11T00:00:00.000Z,
    2017-04-12T00:00:00.000Z,
    2017-04-13T00:00:00.000Z,
    2017-04-14T00:00:00.000Z,
    2017-04-15T00:00:00.000Z,
    2017-04-16T00:00:00.000Z,
    2017-04-17T00:00:00.000Z,
    2017-04-18T00:00:00.000Z,
    2017-04-19T00:00:00.000Z,
    2017-04-20T00:00:00.000Z,
    2017-04-21T00:00:00.000Z,
    2017-04-22T00:00:00.000Z,
    2017-04-23T00:00:00.000Z,
    2017-04-24T00:00:00.000Z,
    2017-04-25T00:00:00.000Z,
    2017-04-26T00:00:00.000Z,
    2017-04-27T00:00:00.000Z,
    2017-04-28T00:00:00.000Z,
    2017-04-29T00:00:00.000Z ] ]
Streams completed
```
