import { Injectable } from '@angular/core';
import { Account, log } from '@aurora';
import { IamService } from '@aurora/modules/iam';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { AccountInfo, InteractionStatus } from '@azure/msal-browser';
import { filter, from, map, Observable, of, ReplaySubject, Subject, switchMap, take, tap } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root',
})
export class IamMsEntraIdAdapterService extends IamService
{
    private _account$: ReplaySubject<Account> = new ReplaySubject<Account>(1);
    private _account: Account = null;

    /**
     * Constructor
     */
    constructor(
        private readonly msalBroadcastService: MsalBroadcastService,
        private readonly msalService: MsalService,
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
        const account$ = new Subject<{ me: Account; }>();

        this.msalBroadcastService
            .inProgress$
            .pipe(
                filter(status => status === InteractionStatus.None),
                take(1),
                switchMap(() =>
                {
                    if (this.msalService.instance.getAllAccounts().length > 0)
                    {
                        this.msalService.instance.setActiveAccount(this.msalService.instance.getAllAccounts()[0]);
                    }

                    const activeAccount = this.msalService.instance.getActiveAccount();
                    if (activeAccount)
                    {
                        return from(
                            this.msalService.instance.acquireTokenSilent({
                                scopes: [environment.msEntraId.scopes[0]],
                                account: activeAccount,
                            })
                        )
                        .pipe(
                            tap(response =>
                            {
                                const token = response.accessToken;
                                const payloadToken = JSON.parse(atob(token.split('.')[1]));
                                this.checkAndSetActiveAccount(activeAccount, payloadToken);
                            }),
                            map(() => ({ me: this.account }))
                        );
                    }
                    return of({ me: null });
                })
            )
            .subscribe(result =>
            {
                account$.next(result);
                account$.complete();
            });

        return account$;
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

    private checkAndSetActiveAccount(activeAccount: AccountInfo, payloadToken: any): void
    {
        log('[DEBUG] Azure Ad active account: ', activeAccount);
        log('[DEBUG] Azure Ad payload token: ', payloadToken);

        const permissions = new Set<string>();

        if (Array.isArray(payloadToken.roles))
        {
            for (const role of payloadToken.roles)
            {
                permissions.add(role);
            }
        }

        if (Array.isArray(activeAccount.idTokenClaims?.roles))
        {
            for (const role of activeAccount.idTokenClaims?.roles)
            {
                permissions.add(role);
            }
        }

        this.account = {
            id               : null,
            email            : activeAccount.username,
            username         : activeAccount.username,
            isActive         : true,
            clientId         : activeAccount.idTokenClaims.aud,
            dApplicationCodes: [],
            dPermissions     : {
                all: [...permissions],
            },
            dTenants: [],
            scopes:[],
            user    : {
                name    : activeAccount.name,
                status  : null,
                surname : null,
            },
            createdAt: null,
            updatedAt: null,
        };
    }
}
