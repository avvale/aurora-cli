import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {
    FormsModule,
    NgForm,
    ReactiveFormsModule,
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertComponent, FuseAlertType } from '@fuse/components/alert';
import { catchError, finalize, of, throwError } from 'rxjs';

// ---- customizations ----
import { AuthenticationService } from '@aurora';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';

@Component({
    selector     : 'auth-forgot-password',
    templateUrl  : './forgot-password.component.html',
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations,
    imports      : [
        FuseAlertComponent,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        RouterLink,
        TranslocoModule,
    ],
})
export class AuthForgotPasswordComponent implements OnInit
{
    @ViewChild('forgotPasswordNgForm') forgotPasswordNgForm: NgForm;

    alert: { type: FuseAlertType; message: string; } = {
        type   : 'success',
        message: '',
    };
    forgotPasswordForm: UntypedFormGroup;
    showAlert: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _formBuilder: UntypedFormBuilder,

        // ---- customizations ----
        private readonly authenticationService: AuthenticationService,
        private readonly translocoService: TranslocoService,
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Create the form
        this.forgotPasswordForm = this._formBuilder.group({
            email: ['', [Validators.required]],
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Send the reset link
     */
    sendResetLink(): void
    {
        // Return if the form is invalid
        if (this.forgotPasswordForm.invalid)
        {
            return;
        }

        // Disable the form
        this.forgotPasswordForm.disable();

        // Hide the alert
        this.showAlert = false;

        // Forgot password
        this.authenticationService
            .forgotPassword(this.forgotPasswordForm.get('email').value)
            .pipe(
                finalize(() =>
                {
                    // Re-enable the form
                    this.forgotPasswordForm.enable();

                    // Reset the form
                    this.forgotPasswordNgForm.resetForm();

                    // Show the alert
                    this.showAlert = true;
                }),
                catchError(error =>
                {
                    if (error.message === 'IamAccount not found')
                    {
                        this.alert = {
                            type   : 'error',
                            message: this.translocoService.translate('iam.SendEmailForgotPasswordError'),
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
                    this.alert = {
                        type   : 'success',
                        message: this.translocoService.translate('iam.SendEmailForgotPasswordSuccessful'),
                    };
                }
            });
    }
}
