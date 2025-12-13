import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ActionStatusManagerService {
    actionStatusStorage: { [key: string]: BehaviorSubject<boolean> } = {};

    getActionStatus(key: string): BehaviorSubject<boolean> {
        if (this.actionStatusStorage[key] === undefined)
            this.actionStatusStorage[key] = new BehaviorSubject<boolean>(false);
        return this.actionStatusStorage[key];
    }

    startActionStatus(key: string): void {
        this.getActionStatus(key).next(true);
    }

    endActionStatus(key: string): void {
        this.getActionStatus(key).next(false);
    }
}
