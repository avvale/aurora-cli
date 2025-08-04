import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { OAuthRefreshToken } from '@apps/o-auth/o-auth.types';
import { RefreshTokenService } from '@apps/o-auth/refresh-token';
import { Action, Crumb, defaultDetailImports, log, mapActions, SnackBarInvalidFormComponent, Utils, ViewDetailComponent } from '@aurora';
import { MtxDatetimepickerModule } from '@ng-matero/extensions/datetimepicker';
import { lastValueFrom, takeUntil } from 'rxjs';

@Component({
    selector: 'o-auth-refresh-token-detail',
    templateUrl: './refresh-token-detail.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ...defaultDetailImports,
        MatCheckboxModule, MtxDatetimepickerModule,
    ],
})
export class RefreshTokenDetailComponent extends ViewDetailComponent
{
    // ---- customizations ----
    // ..

    // Object retrieved from the database request,
    // it should only be used to obtain uninitialized
    // data in the form, such as relations, etc.
    // It should not be used habitually, since the source of truth is the form.
    managedObject: OAuthRefreshToken;

    // breadcrumb component definition
    breadcrumb: Crumb[] = [
        { translation: 'App' },
        { translation: 'oAuth.RefreshTokens', routerLink: ['/o-auth/refresh-token']},
        { translation: 'oAuth.RefreshToken' },
    ];

    constructor(
        private readonly refreshTokenService: RefreshTokenService,
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
                    'oAuth::refreshToken.detail.new' : 'oAuth::refreshToken.detail.create',
                    'oAuth::refreshToken.detail.edit': 'oAuth::refreshToken.detail.update',
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
            accessTokenId: ['', [Validators.required, Validators.minLength(36), Validators.maxLength(36)]],
            token: ['', [Validators.required]],
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
            case 'oAuth::refreshToken.detail.new':
                this.fg.get('id').setValue(Utils.uuid());
                break;

            case 'oAuth::refreshToken.detail.edit':
                this.refreshTokenService
                    .refreshToken$
                    .pipe(takeUntil(this.unsubscribeAll$))
                    .subscribe(item =>
                    {
                        this.managedObject = item;
                        this.fg.patchValue(item);
                    });
                break;

            case 'oAuth::refreshToken.detail.create':
                try
                {
                    await lastValueFrom(
                        this.refreshTokenService
                            .create<OAuthRefreshToken>({
                                object: this.fg.value,
                            }),
                    );

                    this.snackBar.open(
                        `${this.translocoService.translate('oAuth.RefreshToken')} ${this.translocoService.translate('Created.M')}`,
                        undefined,
                        {
                            verticalPosition: 'top',
                            duration        : 3000,
                        },
                    );

                    this.router.navigate(['o-auth/refresh-token']);
                }
                catch(error)
                {
                    log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
                }
                break;

            case 'oAuth::refreshToken.detail.update':
                try
                {
                    await lastValueFrom(
                        this.refreshTokenService
                            .updateById<OAuthRefreshToken>({
                                object: this.fg.value,
                            }),
                    );

                    this.snackBar.open(
                        `${this.translocoService.translate('oAuth.RefreshToken')} ${this.translocoService.translate('Saved.M')}`,
                        undefined,
                        {
                            verticalPosition: 'top',
                            duration        : 3000,
                        },
                    );

                    this.router.navigate(['o-auth/refresh-token']);
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
