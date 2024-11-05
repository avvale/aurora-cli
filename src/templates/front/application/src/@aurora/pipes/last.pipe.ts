import { Pipe, PipeTransform } from '@angular/core';
import { last } from 'lodash-es';

@Pipe({
    name      : 'last',
    pure      : true,
    standalone: true,
})
export class LastPipe implements PipeTransform
{
    transform(arr: any[]): string
    {
        if (!Array.isArray(arr)) return null;
        return last(arr);
    }
}
