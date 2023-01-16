import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Action, ActionService } from '@aurora';

@Injectable({
    providedIn: 'root',
})
export class ExampleDetailResolver implements Resolve<Action>
{
    constructor(
        private readonly actionService: ActionService,
    )
    {}

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): Action
    {
        return this.actionService.action({
            id          : 'example::exampleSection.detail.new',
            isViewAction: true,
        });
    }
}
