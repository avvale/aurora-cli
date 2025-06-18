import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {
    FormsModule,
    NgForm,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertComponent, FuseAlertType } from '@fuse/components/alert';
import { catchError, finalize, of, throwError } from 'rxjs';

// ---- customizations ----
import { AuthenticationService, createPassword, log, MatPasswordStrengthModule, SnackBarInvalidFormComponent, ViewDetailComponent } from '@aurora';
import { TranslocoModule } from '@jsverse/transloco';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { AsyncPipe } from '@angular/common';

@Component({
    selector     : 'auth-reset-password',
    templateUrl  : './reset-password.component.html',
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations,
    imports      : [
        FuseAlertComponent,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule,
        RouterLink,

        // ---- customizations ----
        AsyncPipe,
        MatPasswordStrengthModule,
        TranslocoModule,
    ],
})
export class AuthResetPasswordComponent extends ViewDetailComponent implements OnInit
{
    @ViewChild('resetPasswordNgForm') resetPasswordNgForm: NgForm;

    alert: { type: FuseAlertType; message: string; } = {
        type   : 'success',
        message: '',
    };
    showAlert: boolean = false;

    /**
     * Constructor
     */
    constructor(
        // ---- customizations ----
        private readonly authenticationService: AuthenticationService,
        private readonly route: ActivatedRoute,
    )
    {
        super();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    createForm(): void
    {
        // Create the form
        this.fg = this.fb.group(
            {
                password: ['', [
                    Validators.required,
                    Validators.minLength(8),
                    Validators.maxLength(30),
                    RxwebValidators.password({
                        validation: { digit: true, specialCharacter: true, lowerCase: true, upperCase: true },
                        message   : { digit: 'PasswordDigit', specialCharacter: 'PasswordSpecialCharacter', lowerCase: 'PasswordLowerCase', upperCase: 'PasswordUpperCase' },
                    }),
                ]],
                passwordConfirm: ['', [
                    Validators.required,
                    RxwebValidators.compare({ fieldName: 'password' }),
                ]],
            },
        );
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

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

        this.resetPassword();
    }

    /**
     * Reset password
     */
    resetPassword(): void
    {
        // Disable the form
        this.fg.disable();

        // Hide the alert
        this.showAlert = false;

        const token = this.route.snapshot.paramMap.get('token') || '';

        // Send the request to the server
        this.authenticationService
            .resetPassword(
                this.fg.get('password').value,
                token,
            )
            .pipe(
                finalize(() =>
                {
                    // Re-enable the form
                    this.fg.enable();

                    // Reset the form
                    this.resetPasswordNgForm.resetForm();

                    // Show the alert
                    this.showAlert = true;
                }),
                catchError(error =>
                {
                    if (error.message === 'IamUser not found')
                    {
                        this.alert = {
                            type   : 'error',
                            message: this.translocoService.translate('iam.ResetYourPassword404Error'),
                        };

                        return of(false);
                    }

                    if (error.message === 'Invalid character' || error.message === 'Invalid token')
                    {
                        this.alert = {
                            type   : 'error',
                            message: this.translocoService.translate('iam.ResetYourPasswordInvalidToken'),
                        };

                        return of(false);
                    }

                    if (error.message === 'Token expired')
                    {
                        this.alert = {
                            type   : 'error',
                            message: this.translocoService.translate('iam.ResetYourPasswordTokenExpired'),
                        };

                        return of(false);
                    }

                    return throwError(() => error);
                }),
            )
            .subscribe(response =>
            {
                if (response === true)
                {
                    // Set the alert
                    this.alert = {
                        type   : 'success',
                        message: this.translocoService.translate('iam.ResetYourPasswordSuccessful'),
                    };
                }
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

        this.fg.get('password').setValue(password);
        this.fg.get('password').markAsDirty();
        this.fg.get('passwordConfirm').setValue(password);
        this.fg.get('passwordConfirm').markAsDirty();
    }
}
