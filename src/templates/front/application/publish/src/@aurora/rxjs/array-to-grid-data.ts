import { map, Observable } from 'rxjs';

export const arrayToGridData = <T>() =>
    (source: Observable<T[]>) =>
        source
            .pipe(
                map((value: T[]) => ({
                    count: value.length,
                    total: value.length,
                    rows : value,
                })),
            );