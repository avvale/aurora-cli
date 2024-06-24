import { Injectable } from '@angular/core';
import { Observable, of, ReplaySubject } from 'rxjs';
import { Account } from './iam.types';
import { IamService } from './iam.service';
import { account } from './data';

@Injectable({
    providedIn: 'root',
})
export class IamMockAdapterService extends IamService
{
    private _account$: ReplaySubject<Account> = new ReplaySubject<Account>(1);
    private _account: Account;

    /**
     * Constructor
     */
    constructor()
    {
        super();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for account
     *
     * @param value
     */
    set account(value: Account)
    {
        // Store the value
        this._account$.next(value);
        this._account = value;
    }

    get account$(): Observable<Account>
    {
        return this._account$.asObservable();
    }

    get me(): Account
    {
        return this._account;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get the current logged in account data
     */
    get(): Observable<{ me: Account; }>
    {
        this.account = account;
        return of({ me: this.me });
    }

    /**
     * Update the user
     *
     * @param account
     */
    update(account: Account): Observable<any>
    {
        return of(false);
    }

    clear(): void
    {
        this.account = null;
    }
}
