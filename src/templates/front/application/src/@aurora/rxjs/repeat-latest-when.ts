import { combineLatest, map, Observable, startWith } from 'rxjs';

export const repeatLatestWhen = <T>(notifier$: Observable<any>) =>
    (source: Observable<T>) =>
        combineLatest([
            source,
            notifier$.pipe(startWith(null)),
        ]).pipe(
            map(([val]) => val),
        );