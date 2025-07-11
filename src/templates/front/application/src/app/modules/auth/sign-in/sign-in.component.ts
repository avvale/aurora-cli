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
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertComponent, FuseAlertType } from '@fuse/components/alert';

// ---- customizations ----
import { AuthenticationService, IamService, SessionService, log } from '@aurora';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { catchError, lastValueFrom, of, throwError } from 'rxjs';
import { AuthorizationService } from '@aurora/modules/authorization/authorization.service';

@Component({
    selector: 'auth-sign-in',
    templateUrl: './sign-in.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    standalone: true,
    imports: [
        FuseAlertComponent,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatProgressSpinnerModule,

        // ---- customizations ----
        TranslocoModule,
        RouterModule
    ],
})
export class AuthSignInComponent implements OnInit
{
    @ViewChild('signInNgForm') signInNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    signInForm: UntypedFormGroup;
    showAlert: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _formBuilder: UntypedFormBuilder,
        private _router: Router,

        // ---- customizations ----
        private sessionService: SessionService,
        private authenticationService: AuthenticationService,
        private authorizationService: AuthorizationService,
        private iamService: IamService,
        private translocoService: TranslocoService
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    async ngOnInit(): Promise<void>
    {
        // Create the form
        this.signInForm = this._formBuilder.group({
            email: ['', [Validators.required]],
            password: ['', Validators.required],
            rememberMe: [''],
        });

        // at this point, there should be no previous session,
        // so there would be no need to load it with this.sessionService.init();

        // checks and loads the minimum data for the correct
        // operation of the application if necessary
        await this.sessionService.loadMinimumData();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign in
     */
    signIn(): void
    {
        // Return if the form is invalid
        if (this.signInForm.invalid) {
            return;
        }

        // Disable the form
        this.signInForm.disable();

        // Hide the alert
        this.showAlert = false;

        this.authenticationService
            .signIn(this.signInForm.value)
            .pipe(
                catchError(error =>
                {
                    if (
                        error.message === 'Unauthorized' ||
                        error.message === 'IamUser not found'
                    )
                        return of({ code: 401, message: 'Unauthorized' });

                    return throwError(() => error);
                }),
            )
            .subscribe({
                next: async response =>
                {
                    const data = response === true ? await lastValueFrom(this.iamService.get()) : null;

                    if (
                        response.code === 401 ||
                        !this.authorizationService.can('aurora.access')
                    )
                    {
                        log(`[DEBUG] Error to login application: ${response}`);

                        // Re-enable the form
                        this.signInForm.enable();

                        // Reset the form
                        this.signInNgForm.resetForm();

                        if (response.code === 401)
                        {
                            // the authenticationService.signOut() does so in apollo.factory.ts

                            // Set the alert
                            this.alert = {
                                type: 'error',
                                message: this.translocoService.translate('validations.Login'),
                            };
                        }
                        else
                        {
                            this.authenticationService.signOut();

                            // Set the alert
                            this.alert = {
                                type: 'error',
                                message: this.translocoService.translate('validations.AccessDenied'),
                            };
                        }

                        // Show the alert
                        this.showAlert = true;

                        return;
                    }

                    // Set the redirect url.
                    // The '/signed-in-redirect' is a dummy url to catch the request and redirect the user
                    // to the correct page after a successful sign in. This way, that url can be set via
                    // routing file and we don't have to touch here.
                    const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/signed-in-redirect';

                    // once we have executed iamService.get(), after that, user will be available in iamService.me
                    // set user preferred lang
                    const langs = this.sessionService.get('langs');
                    const userPreferredLang = langs.find(lang => lang.id === data.me.user.langId);
                    if (userPreferredLang) this.translocoService.setActiveLang(userPreferredLang.iso6392);

                    // Navigate to the redirect url
                    this._router.navigateByUrl(redirectURL);
                },
            });
    }
}
