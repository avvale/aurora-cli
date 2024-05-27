import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Action, ActionService } from '@aurora';

export const accountEditResolver: ResolveFn<Action> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);

    return actionService.action({
        id          : 'settings::account.detail.edit',
        isViewAction: true,
    });
};
