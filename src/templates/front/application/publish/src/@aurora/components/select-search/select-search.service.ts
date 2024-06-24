import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ReplaySubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SelectSearchService
{
    filterSelect<T>(
        filterCtrl: FormControl,
        objects: T[],
        objectsFiltered$: ReplaySubject<T[]>,
        exposeKeyword: (object: T) => string = object => object['name'],
    ): void
    {
        if (!objects) return;

        // get the search keyword
        let search = filterCtrl.value;
        if (!search)
        {
            objectsFiltered$.next([...objects]);
            return;
        }
        else
        {
            search = search.toLowerCase();
        }

        // filter the objects
        objectsFiltered$.next(
            objects
                .filter(object => exposeKeyword(object).toLowerCase().indexOf(search) > -1),
        );
    }
}
