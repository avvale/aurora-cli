import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation, WritableSignal, inject, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AccountService } from '@apps/iam/account';
import { checkPasswordValidator } from '@apps/iam/shared';
import { Action, GetSpinnerFlagPipe, MatPasswordStrengthModule, SnackBarInvalidFormComponent, ViewDetailComponent, createPassword, log } from '@aurora';
import { TranslocoModule } from '@ngneat/transloco';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { lastValueFrom } from 'rxjs';

@Component({
    selector       : 'settings-security',
    templateUrl    : './security.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone     : true,
    imports        : [
        AsyncPipe, FormsModule, GetSpinnerFlagPipe, MatButtonModule, MatFormFieldModule,
        MatIconModule, MatInputModule, MatPasswordStrengthModule, MatProgressSpinnerModule,
        MatSlideToggleModule,ReactiveFormsModule, TranslocoModule,
    ],
})
export class SettingsSecurityComponent extends ViewDetailComponent
{
    currentPasswordStatus: WritableSignal<string> = signal('VALID');

    accountService = inject(AccountService);

    get currentPassword(): FormControl
    {
        return this.fg.get('currentPassword') as FormControl;
    }

    init(): void
    {
        // subscribe to async validators status
        this.currentPassword
            .statusChanges
            .subscribe(status => this.currentPasswordStatus.set(status));
    }

    onSubmit($event): void
    {
        // force validate repeat password, usually only validated if
        // the value of the input changes.
        // in this case depends on the change of the password field
        this.fg.get('repeatNewPassword')?.updateValueAndValidity();

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
            id          : 'settings::security.detail.update',
            isViewAction: false,
        });
    }

    handleCreateNewPassword(): void
    {
        const password = createPassword({
            length   : 10,
            numbers  : true,
            symbols  : true,
            lowercase: true,
            uppercase: true,
            exclude  : '"\'~`^()-_=+[{]}\\|;:,<.>/',
            strict   : true,
        });

        this.fg.get('newPassword').setValue(password);
        this.fg.get('newPassword').markAsDirty();
        this.fg.get('repeatNewPassword').setValue(password);
        this.fg.get('repeatNewPassword').markAsDirty();
    }

    createForm(): void
    {
        // Create the form
        this.fg = this.fb.group({
            currentPassword: ['', {
                validators: [Validators.required],
                updateOn  : 'blur',
            }],
            newPassword: ['', [
                Validators.required,
                Validators.minLength(8),
                Validators.maxLength(30),
                RxwebValidators.password({
                    validation: { digit: true, specialCharacter: true, lowerCase: true, upperCase: true },
                    message   : { digit: 'PasswordDigit', specialCharacter: 'PasswordSpecialCharacter', lowerCase: 'PasswordLowerCase', upperCase: 'PasswordUpperCase' },
                }),
            ]],
            repeatNewPassword: ['', [Validators.required, RxwebValidators.compare({ fieldName: 'newPassword' })]],
            twoStep          : [true],
            askPasswordChange: [false],
        });
    }

    async handleAction(action: Action): Promise<void>
    {
        // add optional chaining (?.) to avoid first call where behaviour subject is undefined
        switch (action?.id)
        {
            /* #region common actions */
            case 'settings::security.detail.edit':
                // load async validators
                this.currentPassword.setAsyncValidators(
                    checkPasswordValidator(this.accountService),
                );

                break;

            case 'settings::security.detail.update':
                try
                {
                    await lastValueFrom(
                        this.accountService
                            .updateMeAccount({
                                object: {
                                    id  : 'null',
                                    user: {
                                        id      : 'null',
                                        password: this.fg.get('newPassword').value,
                                    },
                                },
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

                    this.fg.reset();
                    this.fg.markAsPristine();
                    this.fg.markAsUntouched();
                    this.currentPassword.setErrors(null);
                    this.fg.get('newPassword').setErrors(null);
                    this.fg.get('repeatNewPassword').setErrors(null);
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
