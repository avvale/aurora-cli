import { TextFieldModule } from '@angular/cdk/text-field';
import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation, WritableSignal, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { AccountService } from '@apps/iam/account';
import { uniqueEmailValidator, uniqueUsernameValidator } from '@apps/iam/shared';
import { Account, Action, CoreGetLangsService, CoreLang, GetSpinnerFlagPipe, IamService, SnackBarInvalidFormComponent, ViewDetailComponent, log } from '@aurora';
import { TranslocoModule } from '@ngneat/transloco';
import { environment } from 'environments/environment';
import { Observable, lastValueFrom, takeUntil } from 'rxjs';

@Component({
    selector       : 'settings-account',
    templateUrl    : './account.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone     : true,
    imports        : [
        AsyncPipe, FormsModule, GetSpinnerFlagPipe, MatButtonModule, MatFormFieldModule,
        MatIconModule, MatInputModule, MatSelectModule, MatOptionModule,
        MatProgressSpinnerModule, ReactiveFormsModule, TextFieldModule, TranslocoModule,
    ],
})
export class SettingsAccountComponent extends ViewDetailComponent
{
    account: Account;
    langs$: Observable<CoreLang[]>;
    environment = environment;
    usernameStatus: WritableSignal<string> = signal('VALID');
    emailStatus: WritableSignal<string> = signal('VALID');

    iamService = inject(IamService);
    coreGetLangsService = inject(CoreGetLangsService);
    accountService = inject(AccountService);

    get user(): FormGroup
    {
        return this.fg.get('user') as FormGroup;
    }

    get email(): FormControl
    {
        return this.fg.get('email') as FormControl;
    }

    get username(): FormControl
    {
        return this.fg.get('username') as FormControl;
    }

    createForm(): void
    {
        /* eslint-disable key-spacing */
        this.fg = this.fb.group({
            id: ['', [Validators.required, Validators.minLength(36), Validators.maxLength(36)]],
            email: ['', [Validators.maxLength(128), Validators.email]],
            username: ['', {
                validators: [Validators.required, Validators.maxLength(128)],
                updateOn: 'blur',
            }],
            user    : this.fb.group({
                id: ['', [Validators.required, Validators.minLength(36), Validators.maxLength(36)]],
                name: ['', [Validators.required, Validators.maxLength(255)]],
                surname: ['', [Validators.required, Validators.maxLength(255)]],
                langId: null,
            }),
        });
        /* eslint-enable key-spacing */
    }

    init(): void
    {
        this.langs$ = this.coreGetLangsService.langs$;

        // subscribe to async validators status
        this.email
            .statusChanges
            .subscribe(status => this.emailStatus.set(status));

        this.username
            .statusChanges
            .subscribe(status => this.usernameStatus.set(status));
    }

    onSubmit($event): void
    {
        // manage validations before execute actions
        if (this.fg.invalid)
        {
            log('[DEBUG] Error to validate form: ', this.fg);
            this.validationMessagesService.validate();

            this.snackBar.openFromComponent(
                SnackBarInvalidFormComponent,
                {
                    data: {
                        message   : `${this.translocoService.translate('InvalidForm')}`,
                        textButton: `${this.translocoService.translate('InvalidFormOk')}`,
                    },
                    panelClass      : 'error-snackbar',
                    verticalPosition: 'top',
                    duration        : 10000,
                },
            );
            return;
        }

        this.actionService.action({
            id          : 'settings::account.detail.update',
            isViewAction: false,
        });
    }

    async handleAction(action: Action): Promise<void>
    {
        // add optional chaining (?.) to avoid first call where behaviour subject is undefined
        switch (action?.id)
        {
            /* #region common actions */
            case 'settings::account.detail.edit':
                this.iamService
                    .account$
                    .pipe(takeUntil(this.unsubscribeAll$))
                    .subscribe((account: Account) =>
                    {
                        this.account = account;

                        // load async validators
                        this.email.setAsyncValidators(
                            uniqueEmailValidator(this.accountService, [account.email]),
                        );
                        this.username.setAsyncValidators(
                            uniqueUsernameValidator(this.accountService, [account.username]),
                        );
                        this.fg.patchValue(account);
                    });
                break;

            case 'settings::account.detail.update':
                try
                {
                    await lastValueFrom(
                        this.accountService
                            .updateMeAccount({
                                object: this.fg.value,
                            }),
                    );

                    this.snackBar.open(
                        `${this.translocoService.translate('Account')} ${this.translocoService.translate('Saved.F')}`,
                        undefined,
                        {
                            verticalPosition: 'top',
                            duration        : 3000,
                        },
                    );
                }
                catch(error)
                {
                    log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
                }
                break;
                /* #endregion common actions */
        }
    }
}
