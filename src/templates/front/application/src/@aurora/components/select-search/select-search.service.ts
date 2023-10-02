import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ReplaySubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SelectSearchService
{
    filterSelect<T extends { name: string; }>(
        filterCtrl: FormControl,
        objects: T[],
        objectsFiltered$: ReplaySubject<T[]>,
    ): void
    {
        if (!objects) return;

        // get the search keyword
        let search = filterCtrl.value;
        if (!search)
        {
            objectsFiltered$.next(objects.slice());
            return;
        }
        else
        {
            search = search.toLowerCase();
        }

        // filter the objects
        objectsFiltered$.next(
            objects.filter(object => object.name.toLowerCase().indexOf(search) > -1),
        );
    }
}
