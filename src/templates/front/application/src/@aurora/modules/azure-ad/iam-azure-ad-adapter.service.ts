import { Injectable } from '@angular/core';
import { Account, log } from '@aurora';
import { IamService } from '@aurora/modules/iam';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { InteractionStatus } from '@azure/msal-browser';
import { filter, map, Observable, of, ReplaySubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class IamAzureAdAdapterService extends IamService
{
    private _account$: ReplaySubject<Account> = new ReplaySubject<Account>(1);
    private _account: Account;

    /**
     * Constructor
     */
    constructor(
        private readonly msalBroadcastService: MsalBroadcastService,
        private readonly authService: MsalService,
    )
    {
        super();
        this.init();
    }

    init(): void
    {
        const subscription = this.msalBroadcastService
            .inProgress$
            .pipe(
                filter((status: InteractionStatus) => status === InteractionStatus.None),
                map(() => this.authService.instance.getAllAccounts().length > 0),
            )
            .subscribe((response: boolean) =>
            {
                if (response)
                {
                    this.checkAndSetActiveAccount();
                    subscription.unsubscribe();
                }
            });
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
        // asdf
        return of({ me: null });
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

    private checkAndSetActiveAccount(): void
    {
        /**
         * If no active account set but there are accounts signed in, sets first account to active account
         * To use active account set here, subscribe to inProgress$ first in your component
         * Note: Basic usage demonstrated. Your app may require more complicated account selection logic
         */
        const activeAccount = this.authService.instance.getAllAccounts()[0];

        log('[DEBUG] Azure Ad active account: ', activeAccount);

        this.account = {
            id               : null,
            email            : activeAccount.username,
            isActive         : true,
            clientId         : activeAccount.idTokenClaims.aud,
            dApplicationCodes: [],
            dPermissions     : {
                all: [],
            },
            dTenants: [],
            user    : {
                name    : activeAccount.name,
                status  : null,
                surname : null,
                username: activeAccount.username,
            },
            createdAt: null,
            updatedAt: null,
        };

        if (
            !activeAccount &&
            this.authService.instance.getAllAccounts().length > 0
        )
        {
            const accounts = this.authService.instance.getAllAccounts();
            this.authService.instance.setActiveAccount(accounts[0]);
        }
    }
}
