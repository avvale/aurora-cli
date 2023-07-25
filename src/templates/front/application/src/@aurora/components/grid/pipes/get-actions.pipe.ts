import { Pipe, PipeTransform } from '@angular/core';
import { ColumnConfigAction } from '../grid.types';

@Pipe({
    name: 'getActions',
    standalone: true,
})
export class GetActionsPipe implements PipeTransform
{
    transform(actionsFn: (item: any) => ColumnConfigAction[], object: any): ColumnConfigAction[]
    {
        if (actionsFn instanceof Function) return actionsFn(object);
        return [];
    }
}