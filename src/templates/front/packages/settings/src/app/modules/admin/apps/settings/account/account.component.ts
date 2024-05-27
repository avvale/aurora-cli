import { TextFieldModule } from '@angular/cdk/text-field';
import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AccountService } from '@apps/iam/account';
import { Account, Action, CoreGetLangsService, CoreLang, GetSpinnerFlagPipe, IamService, SnackBarInvalidFormComponent, ViewDetailComponent, log, mapActions } from '@aurora';
import { TranslocoModule } from '@ngneat/transloco';
import { Observable, lastValueFrom, takeUntil } from 'rxjs';
import { environment } from 'environments/environment';

@Component({
    selector       : 'settings-account',
    templateUrl    : './account.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone     : true,
    imports        : [
        AsyncPipe, FormsModule, GetSpinnerFlagPipe, ReactiveFormsModule, MatFormFieldModule, MatIconModule,
        MatInputModule, TextFieldModule, MatSelectModule, MatOptionModule,
        MatButtonModule, TranslocoModule,
    ],
})
export class SettingsAccountComponent extends ViewDetailComponent
{
    iamService = inject(IamService);
    coreGetLangsService = inject(CoreGetLangsService);
    account: Account;
    langs$: Observable<CoreLang[]>;
    accountService = inject(AccountService);
    environment = environment;

    get user(): FormGroup
    {
        return this.fg.get('user') as FormGroup;
    }

    createForm(): void
    {
        /* eslint-disable key-spacing */
        this.fg = this.fb.group({
            id: ['', [Validators.required, Validators.minLength(36), Validators.maxLength(36)]],
            email: ['', [Validators.maxLength(128), Validators.email]],
            username: ['', [Validators.required, Validators.maxLength(128)]],
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
                        this.fg.patchValue(account);
                    });
                break;

            case 'settings::account.detail.update':
                try
                {

                    await lastValueFrom(
                        this.accountService
                            .meAccountUpdate({
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

                    // this.router.navigate(['iam/tag']);
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
