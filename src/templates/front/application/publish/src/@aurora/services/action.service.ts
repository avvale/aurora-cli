import { Injectable } from '@angular/core';
import { Action, log } from '@aurora';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ActionService
{
    private _action: BehaviorSubject<Action> = new BehaviorSubject(null);
    private cache = {};

    constructor() { /**/ }

    get action$(): Observable<Action>
    {
        return this._action.asObservable();
    }

    getCache(key: string): any
    {
        return this.cache[key] ? this.cache[key] : {};
    }

    setCache(key: string, data: any): void
    {
        this.cache[key] = { ...this.getCache(key), ...data };
    }

    action(action: Action): Action
    {
        // set default isViewAction to true
        action = {
            id          : null,
            isViewAction: true,
            meta        : {},
            ...action,
        };

        this.setCache(action.id, action.meta);

        const cachedAction = action.noCache ? action : { ...action, meta: this.getCache(action.id) };

        this._action.next(cachedAction);

        log('[DEBUG] Handle action: ', cachedAction);

        return action;
    }

    clear(): void
    {
        this._action = new BehaviorSubject(null);
    }
}
