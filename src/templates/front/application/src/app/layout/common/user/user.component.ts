import { BooleanInput } from '@angular/cdk/coercion';
import { NgClass, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Subject, takeUntil } from 'rxjs';

// ---- customizations ----
import { Account, AuthenticationService, IamService, User } from '@aurora';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
    selector       : 'user',
    templateUrl    : './user.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs       : 'user',
    standalone     : true,
    imports        : [
        // ---- customizations ----
        TranslocoModule,
        MatButtonModule, MatMenuModule, NgIf, MatIconModule, NgClass, MatDividerModule
    ],
})
export class UserComponent implements OnInit, OnDestroy
{
    /* eslint-disable @typescript-eslint/naming-convention */
    static ngAcceptInputType_showAvatar: BooleanInput;
    /* eslint-enable @typescript-eslint/naming-convention */

    @Input() showAvatar: boolean = true;

    // ---- customizations ----
    account: Account;

    get user(): User
    {
        return this.account.user;
    }

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,

        // ---- customizations ----
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
            .subscribe((account: Account) =>
            {
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
        // Update the user
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
