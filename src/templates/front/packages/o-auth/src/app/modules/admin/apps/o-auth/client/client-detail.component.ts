import { OAuthApplication, OAuthClient, OAuthClientGrantType, OAuthScope } from '../o-auth.types';
import { ClientService } from './client.service';
import { ChangeDetectionStrategy, Component, Injector, ViewEncapsulation } from '@angular/core';
import { Validators } from '@angular/forms';
import { Action, Crumb, defaultDetailImports, log, mapActions, Utils, ViewDetailComponent } from '@aurora';
import { Observable, lastValueFrom, takeUntil } from 'rxjs';

// ---- customizations ----
import { ScopeService } from '../scope/scope.service';
import { ApplicationService } from '../application/application.service';
import { KeyValuePipe, NgForOf } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';

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
    applications$: Observable<OAuthApplication[]>;
    scopes$: Observable<OAuthScope[]>;
    oAuthClientGrantType = OAuthClientGrantType;

    // Object retrieved from the database request,
    // it should only be used to obtain uninitialized
    // data in the form, such as relations, etc.
    // It should not be used habitually, since the source of truth is the form.
    managedObject: OAuthClient;

    // breadcrumb component definition
    breadcrumb: Crumb[] = [
        { translation: 'App' },
        { translation: 'oAuth.Clients', routerLink: ['/o-auth/client']},
        { translation: 'oAuth.Client' },
    ];

    constructor(
        protected readonly injector: Injector,
        private readonly clientService: ClientService,
        private readonly scopeService: ScopeService,
        private readonly applicationService: ApplicationService,
    )
    {
        super(injector);
    }

    // this method will be called after the ngOnInit of
    // the parent class you can use instead of ngOnInit
    init(): void
    {
        this.scopes$ = this.scopeService.scopes$;
        this.applications$ = this.applicationService.applications$;
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
            grantType: ['', [Validators.required]],
            name: ['', [Validators.required, Validators.maxLength(255)]],
            secret: ['', [Validators.required, Validators.maxLength(90)]],
            authUrl: ['', [Validators.maxLength(2048)]],
            redirect: ['', [Validators.maxLength(2048)]],
            applicationIds: [],
            scopeOptions: [],
            expiredAccessToken: [null, [Validators.maxLength(10)]],
            expiredRefreshToken: [null, [Validators.maxLength(10)]],
            isActive: false,
            isMaster: false,
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

                        // set many to many associations
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
