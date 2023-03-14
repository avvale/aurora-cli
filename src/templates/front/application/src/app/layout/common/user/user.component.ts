import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { BooleanInput } from '@angular/cdk/coercion';
import { Subject, takeUntil } from 'rxjs';

// ---- customizations ----
import { Account, AuthenticationService, IamService } from '@aurora';

@Component({
    selector       : 'user',
    templateUrl    : './user.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs       : 'user',
})
export class UserComponent implements OnInit, OnDestroy
{
    /* eslint-disable @typescript-eslint/naming-convention */
    // eslint-disable-next-line camelcase
    static ngAcceptInputType_showAvatar: BooleanInput;
    /* eslint-enable @typescript-eslint/naming-convention */

    @Input() showAvatar: boolean = true;
    account: Account;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private readonly _changeDetectorRef: ChangeDetectorRef,
        private readonly _router: Router,
        private readonly iamService: IamService,
        private readonly authenticationService: AuthenticationService,
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Subscribe to user changes
        this.iamService.account$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((account: Account) => {
                this.account = account;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Update the user status
     *
     * @param status
     */
    updateUserStatus(status: string): void
    {
        // Return if user is not available
        if ( !this.account )
        {
            return;
        }

        // Update the user
        // TODO, revisar si registrar status del user
        /* this.iamService.update({
            ...this.account,
            status
        }).subscribe(); */
    }

    /**
     * Sign out
     */
    signOut(): void
    {
        this.authenticationService.signOutAction();
    }
}
