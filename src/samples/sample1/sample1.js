
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
