
# RxJs sample of custom date filter operator

## Lettable operators

We use to filter dates some custom lettable operators defined as high-order functions. These operators are pure functions and are located in (https://github.com/elmao79/rxjs-samples/blob/master/src/lib/OMGRxJsOperators/Date.js).
```js
const Operators = require('rxjs/operators');

exports.greaterThan = targetDate => Operators.filter(item => item > targetDate);
exports.greaterThanEqual = targetDate => Operators.filter(item => item >= targetDate);
exports.lessThan = targetDate => Operators.filter(item => item < targetDate);
exports.lessThanEqual = targetDate => Operators.filter(item => item <= targetDate);
```
Rather than patch operators into `Observable.prototype`, lettable operators can be imported into the modules and re-used easily. Now, thanks to RxJS 5.5 observables have a pipe method that lets call our pure functions operators building a composition of operators.

```js
const Rx = require('rxjs/Rx');
const DateOperators = require('../../lib/OMGRxJsOperators/Date');

const getSampleDatesArr = () => {
    let dates = [];
    // We generate an array with a full year dates.
    const fromDate = new Date('2017-01-01');
    let currDate = new Date(+(fromDate) - 86400000);
    for (let i = 0; i < 365; i += 1) {
        currDate = new Date(+(currDate) + 86400000);
        dates.push(currDate);
    }

    return dates;
};
const dates = getSampleDatesArr();

const sub1$ = Rx.Observable.from(dates)
    .pipe(
        DateOperators.greaterThanEqual(new Date('2017-02-01')),
        DateOperators.lessThanEqual(new Date('2017-02-10'))
    )
    .reduce((acc, curr) => [...acc, curr], []);

const sub2$ = Rx.Observable.from(dates)
    .pipe(
        DateOperators.greaterThan(new Date('2017-02-01')),
        DateOperators.lessThan(new Date('2017-02-10'))
    )
    .reduce((acc, curr) => [...acc, curr], []);

Rx.Observable
    .forkJoin(sub1$, sub2$)
    .subscribe(
        item => console.log(item),
        err => console.log(err),
        () => console.log('Streams completed')
    );
```

```sh
node sample1.js
```
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
    2017-02-10T00:00:00.000Z ],
  [ 2017-02-02T00:00:00.000Z,
    2017-02-03T00:00:00.000Z,
    2017-02-04T00:00:00.000Z,
    2017-02-05T00:00:00.000Z,
    2017-02-06T00:00:00.000Z,
    2017-02-07T00:00:00.000Z,
    2017-02-08T00:00:00.000Z,
    2017-02-09T00:00:00.000Z ] ]
Streams completed
```
