import { Pipe, PipeTransform } from '@angular/core';
import set from 'lodash-es/set';

@Pipe({
    name: 'setValueObject',
})
export class SetValueObjectPipe implements PipeTransform
{
    transform(object: Object, path: string | string[], value: any): Object
    {
        return set(object, path, value);
    }
}
