import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AccessTokenService } from '@apps/o-auth/access-token';
import { OAuthAccessToken } from '@apps/o-auth/o-auth.types';
import { Action, Crumb, defaultDetailImports, log, mapActions, SnackBarInvalidFormComponent, Utils, ViewDetailComponent } from '@aurora';
import { MtxDatetimepickerModule } from '@ng-matero/extensions/datetimepicker';
import { lastValueFrom, takeUntil } from 'rxjs';

@Component({
    selector       : 'o-auth-access-token-detail',
    templateUrl    : './access-token-detail.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone     : true,
    imports        : [
        ...defaultDetailImports,
        MatCheckboxModule, MtxDatetimepickerModule,
    ],
})
export class AccessTokenDetailComponent extends ViewDetailComponent
{
    // ---- customizations ----
    // ..

    // Object retrieved from the database request,
    // it should only be used to obtain uninitialized
    // data in the form, such as relations, etc.
    // It should not be used habitually, since the source of truth is the form.
    managedObject: OAuthAccessToken;

    // breadcrumb component definition
    breadcrumb: Crumb[] = [
        { translation: 'App' },
        { translation: 'oAuth.AccessTokens', routerLink: ['/o-auth/access-token']},
        { translation: 'oAuth.AccessToken' },
    ];

    constructor(
        private readonly accessTokenService: AccessTokenService,
    )
    {
        super();
    }

    // this method will be called after the ngOnInit of
    // the parent class you can use instead of ngOnInit
    init(): void
    {
        /**/
    }

    onSubmit($event): void
    {
        // we have two nested forms, we check that the submit comes from the button
        // that corresponds to the main form to the main form
        if ($event.submitter.getAttribute('form') !== $event.submitter.form.getAttribute('id'))
        {
            $event.preventDefault();
            $event.stopPropagation();
            return;
        }

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
            id: mapActions(
                this.currentViewAction.id,
                {
                    'oAuth::accessToken.detail.new' : 'oAuth::accessToken.detail.create',
                    'oAuth::accessToken.detail.edit': 'oAuth::accessToken.detail.update',
                },
            ),
            isViewAction: false,
        });
    }

    createForm(): void
    {
        /* eslint-disable key-spacing */
        this.fg = this.fb.group({
            id: ['', [Validators.required, Validators.minLength(36), Validators.maxLength(36)]],
            clientId: [null, [Validators.required, Validators.minLength(36), Validators.maxLength(36)]],
            accountId: ['', [Validators.minLength(36), Validators.maxLength(36)]],
            token: ['', [Validators.required]],
            name: ['', [Validators.maxLength(128)]],
            isRevoked: [false, [Validators.required]],
            expiresAt: '',
        });
        /* eslint-enable key-spacing */
    }

    async handleAction(action: Action): Promise<void>
    {
        // add optional chaining (?.) to avoid first call where behaviour subject is undefined
        switch (action?.id)
        {
            /* #region common actions */
            case 'oAuth::accessToken.detail.new':
                this.fg.get('id').setValue(Utils.uuid());
                break;

            case 'oAuth::accessToken.detail.edit':
                this.accessTokenService
                    .accessToken$
                    .pipe(takeUntil(this.unsubscribeAll$))
                    .subscribe(item =>
                    {
                        this.managedObject = item;
                        this.fg.patchValue(item);
                    });
                break;

            case 'oAuth::accessToken.detail.create':
                try
                {
                    await lastValueFrom(
                        this.accessTokenService
                            .create<OAuthAccessToken>({
                                object: this.fg.value,
                            }),
                    );

                    this.snackBar.open(
                        `${this.translocoService.translate('oAuth.AccessToken')} ${this.translocoService.translate('Created.M')}`,
                        undefined,
                        {
                            verticalPosition: 'top',
                            duration        : 3000,
                        },
                    );

                    this.router.navigate(['o-auth/access-token']);
                }
                catch(error)
                {
                    log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
                }
                break;

            case 'oAuth::accessToken.detail.update':
                try
                {
                    await lastValueFrom(
                        this.accessTokenService
                            .updateById<OAuthAccessToken>({
                                object: this.fg.value,
                            }),
                    );

                    this.snackBar.open(
                        `${this.translocoService.translate('oAuth.AccessToken')} ${this.translocoService.translate('Saved.M')}`,
                        undefined,
                        {
                            verticalPosition: 'top',
                            duration        : 3000,
                        },
                    );

                    this.router.navigate(['o-auth/access-token']);
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
