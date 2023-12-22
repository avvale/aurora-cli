import { Pipe, PipeTransform } from '@angular/core';
import get from 'lodash-es/get';

@Pipe({
    name      : 'getValuesObjectsArray',
    pure      : true,
    standalone: true,
})
export class GetValuesObjectsArrayPipe implements PipeTransform
{
    transform(object: any[], path: string | string[]): any[]
    {
        if (!Array.isArray(object)) return [];
        return object.map(item => get(item, path));
    }
}
