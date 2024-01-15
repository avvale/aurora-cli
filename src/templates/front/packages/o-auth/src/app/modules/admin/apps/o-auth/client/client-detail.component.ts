import { ApplicationService } from '../application/application.service';
import { OAuthApplication, OAuthClientGrantType, OAuthScope } from '../o-auth.types';
import { KeyValuePipe, NgForOf } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { ClientService } from '@apps/o-auth/client';
import { OAuthClient } from '@apps/o-auth/o-auth.types';
import { Action, Crumb, defaultDetailImports, log, mapActions, Utils, ViewDetailComponent } from '@aurora';
import { lastValueFrom, Observable, takeUntil } from 'rxjs';
import { ScopeService } from '../scope';

@Component({
    selector       : 'o-auth-client-detail',
    templateUrl    : './client-detail.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone     : true,
    imports        : [
        ...defaultDetailImports,
        KeyValuePipe, MatCheckboxModule, MatSelectModule, NgForOf,
    ],
})
export class ClientDetailComponent extends ViewDetailComponent
{
    // ---- customizations ----
    scopes$: Observable<OAuthScope[]>;
    oAuthClientGrantType = OAuthClientGrantType;

    // Object retrieved from the database request,
    // it should only be used to obtain uninitialized
    // data in the form, such as relations, etc.
    // It should not be used habitually, since the source of truth is the form.
    managedObject: OAuthClient;

    // relationships
    applications$: Observable<OAuthApplication[]>;

    // breadcrumb component definition
    breadcrumb: Crumb[] = [
        { translation: 'App' },
        { translation: 'oAuth.Clients', routerLink: ['/o-auth/client']},
        { translation: 'oAuth.Client' },
    ];

    constructor(
        private readonly applicationService: ApplicationService,
        private readonly clientService: ClientService,
        private readonly scopeService: ScopeService,
    )
    {
        super();
    }

    // this method will be called after the ngOnInit of
    // the parent class you can use instead of ngOnInit
    init(): void
    {
        /**/
        this.applications$ = this.applicationService.applications$;
        this.scopes$ = this.scopeService.scopes$;
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
            return;
        }

        this.actionService.action({
            id: mapActions(
                this.currentViewAction.id,
                {
                    'oAuth::client.detail.new' : 'oAuth::client.detail.create',
                    'oAuth::client.detail.edit': 'oAuth::client.detail.update',
                },
            ),
            isViewAction: false,
        });
    }

    createForm(): void
    {
        this.fg = this.fb.group({
            id: ['', [Validators.required, Validators.minLength(36), Validators.maxLength(36)]],
            grantType: [null, [Validators.required]],
            name: ['', [Validators.required, Validators.maxLength(127)]],
            secret: ['', [Validators.required, Validators.maxLength(127)]],
            authUrl: ['', [Validators.maxLength(2046)]],
            redirect: ['', [Validators.maxLength(2046)]],
            scopeOptions: [],
            expiredAccessToken: [null, [Validators.maxLength(10)]],
            expiredRefreshToken: [null, [Validators.maxLength(10)]],
            isActive: false,
            isMaster: false,
            applicationIds: [],
        });
    }

    async handleAction(action: Action): Promise<void>
    {
        // add optional chaining (?.) to avoid first call where behaviour subject is undefined
        switch (action?.id)
        {
            /* #region common actions */
            case 'oAuth::client.detail.new':
                this.fg.get('id').setValue(Utils.uuid());
                break;

            case 'oAuth::client.detail.edit':
                this.clientService
                    .client$
                    .pipe(takeUntil(this.unsubscribeAll$))
                    .subscribe(item =>
                    {
                        this.managedObject = item;
                        this.fg.patchValue(item);

                        // set many to many applications associations
                        this.fg.get('applicationIds').setValue(item.applications.map(application => application.id));
                    });
                break;

            case 'oAuth::client.detail.create':
                try
                {
                    await lastValueFrom(
                        this.clientService
                            .create<OAuthClient>({
                                object: this.fg.value,
                            }),
                    );

                    this.snackBar.open(
                        `${this.translocoService.translate('oAuth.Client')} ${this.translocoService.translate('Created.M')}`,
                        undefined,
                        {
                            verticalPosition: 'top',
                            duration        : 3000,
                        },
                    );

                    this.router.navigate(['o-auth/client']);
                }
                catch(error)
                {
                    log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
                }
                break;

            case 'oAuth::client.detail.update':
                try
                {
                    await lastValueFrom(
                        this.clientService
                            .updateById<OAuthClient>({
                                object: this.fg.value,
                            }),
                    );

                    this.snackBar.open(
                        `${this.translocoService.translate('oAuth.Client')} ${this.translocoService.translate('Saved.M')}`,
                        undefined,
                        {
                            verticalPosition: 'top',
                            duration        : 3000,
                        },
                    );

                    this.router.navigate(['o-auth/client']);
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
