import { Pipe, PipeTransform } from '@angular/core';
import { ColumnConfigAction } from './grid.types';

@Pipe({
    name: 'getActions',
})
export class GetActionsPipe implements PipeTransform
{
    transform(actionsFn: (item: any) => ColumnConfigAction[], object: any): ColumnConfigAction[]
    {
        return actionsFn(object);
    }
}