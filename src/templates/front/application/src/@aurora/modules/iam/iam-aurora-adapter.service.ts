import { Injectable } from '@angular/core';
import { first, map, Observable, of, ReplaySubject, tap } from 'rxjs';
import { GraphQLService, UserMetaStorageService } from '@aurora';
import { Account } from './iam.types';
import { IamService } from './iam.service';
import { iamMeAccount } from './iam.graphql';

@Injectable({
    providedIn: 'root',
})
export class IamAuroraAdapterService extends IamService
{
    private _account$: ReplaySubject<Account> = new ReplaySubject<Account>(1);
    private _account: Account;

    /**
     * Constructor
     */
    constructor(
        private graphqlService: GraphQLService,
        private userMetaStorageService: UserMetaStorageService,
    )
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
        return this.graphqlService
            .client()
            .watchQuery<{ account: Account; }>({
                query: iamMeAccount,
            })
            .valueChanges
            .pipe(
                first(),
                map<{ data: { iamMeAccount: Account; };}, { me: Account; }>(result => ({ me: result.data.iamMeAccount })),
                tap(data => this.account = data.me),
                tap(data => this.userMetaStorageService.metaSubject$.next(data.me.user.meta)),
            );
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
