import { Pipe, PipeTransform } from '@angular/core';
import { AuthorizationService } from '@aurora';
import { ColumnConfigAction } from '../grid.types';

@Pipe({
    name: 'getActions',
})
export class GetActionsPipe implements PipeTransform
{
    constructor(
        private readonly authorizationService: AuthorizationService,
    )
    {}

    transform(actionsFn: (item: any) => ColumnConfigAction[], object: any): ColumnConfigAction[]
    {
        if (actionsFn instanceof Function)
        {
            const actions = actionsFn(object);
            return actions.filter(action =>
                !action.meta?.permission ||
                (action.meta?.permission && this.authorizationService.can(action.meta.permission)),
            );
        }
        return [];
    }
}