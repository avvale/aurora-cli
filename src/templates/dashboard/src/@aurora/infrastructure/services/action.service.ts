import { Injectable } from '@angular/core';
import { Action } from '@aurora';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ActionService
{
    private _action: BehaviorSubject<Action> = new BehaviorSubject(null);

    constructor() { /**/ }

    get action$(): Observable<Action>
    {
        return this._action.asObservable();
    }

    action(action: Action): Action
    {
        this._action.next(action);

        return action;
    }
}
