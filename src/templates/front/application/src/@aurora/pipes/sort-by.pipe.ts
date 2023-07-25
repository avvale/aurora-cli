import { Pipe, PipeTransform } from '@angular/core';
import orderBy from 'lodash-es/orderBy';

@Pipe({
    name: 'sortBy',
    standalone: true,
})
export class SortByPipe implements PipeTransform {

    transform(value: any[], column: string = '', order: 'asc' | 'desc' = 'asc'): any[]
    {
        // no array
        if (!Array.isArray(value)) return value;

        // array with only one item
        if (value.length <= 1) return value;

        // sort 1d array
        if (!column || column === '')
        {
            if (order === 'asc') return value.sort();

            return value.sort().reverse();
        }

        return orderBy(value, [column], [order]);
    }
}