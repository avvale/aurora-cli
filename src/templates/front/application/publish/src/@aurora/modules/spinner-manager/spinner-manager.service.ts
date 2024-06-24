import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SpinnerManagerService
{
    spinnerStorage: {[key: string]: BehaviorSubject<boolean>;} = {};

    getSpinnerFlag(key: string ): BehaviorSubject<boolean>
    {
        if (this.spinnerStorage[key] === undefined) this.spinnerStorage[key] = new BehaviorSubject<boolean>(false);
        return this.spinnerStorage[key];
    }

    showSpinner(key: string): void
    {
        this.getSpinnerFlag(key).next(true);
    }

    hideSpinner(key: string): void
    {
        this.getSpinnerFlag(key).next(false);
    }
}