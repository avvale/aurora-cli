import { Pipe, PipeTransform } from '@angular/core';
import get from 'lodash-es/get';

@Pipe({
    name: 'get',
    pure: true,
    standalone: true,
})
export class GetPipe implements PipeTransform
{
    transform(object: any, path: string | string[], defaultValue?: any): any
    {
        return get(object, path, defaultValue);
    }
}
