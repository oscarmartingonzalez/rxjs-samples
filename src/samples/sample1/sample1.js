
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
