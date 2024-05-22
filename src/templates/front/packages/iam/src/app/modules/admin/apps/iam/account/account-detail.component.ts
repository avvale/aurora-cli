import { KeyValuePipe, NgForOf } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation, WritableSignal, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionSelectionChange } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AccountService } from '@apps/iam/account';
import { IamAccount } from '@apps/iam/iam.types';
import { ClientService } from '@apps/o-auth/client';
import { OAuthClient, OAuthScope } from '@apps/o-auth/o-auth.types';
import { Action, CoreGetLangsService, CoreLang, Crumb, MatPasswordStrengthModule, OAuthClientGrantType, SelectSearchService, SnackBarInvalidFormComponent, Utils, ViewDetailComponent, createPassword, defaultDetailImports, log, mapActions } from '@aurora';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { BehaviorSubject, Observable, ReplaySubject, lastValueFrom, takeUntil } from 'rxjs';
import { IamAccountType, IamRole, IamTag, IamTenant } from '../iam.types';
import { RoleService } from '../role';
import { TagService } from '../tag';
import { TenantService } from '../tenant/tenant.service';

@Component({
    selector       : 'iam-account-detail',
    templateUrl    : './account-detail.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone     : true,
    imports        : [
        ...defaultDetailImports,
        MatCheckboxModule, MatSelectModule, NgForOf,
        KeyValuePipe, MatToolbarModule, NgxMatSelectSearchModule,
        MatPasswordStrengthModule,
    ],
})
export class AccountDetailComponent extends ViewDetailComponent
{
    // ---- customizations ----
    iamAccountType = IamAccountType;
    roles$: Observable<IamRole[]>;
    tags$: Observable<IamTag[]>;
    clients$: Observable<OAuthClient[]>;
    originClients: OAuthClient[];
    scopeOptions$: BehaviorSubject<OAuthScope[]> = new BehaviorSubject<OAuthScope[]>([]);
    langs$: Observable<CoreLang[]>;
    tenantFilterCtrl: FormControl = new FormControl<string>('');
    filteredTenants$: ReplaySubject<IamTenant[]> = new ReplaySubject<IamTenant[]>(1);
    showTenantsInput: WritableSignal<boolean> = signal(true);

    // Object retrieved from the database request,
    // it should only be used to obtain uninitialized
    // data in the form, such as relations, etc.
    // It should not be used habitually, since the source of truth is the form.
    managedObject: IamAccount;

    // relationships
    tenants$: Observable<IamTenant[]>;

    // breadcrumb component definition
    breadcrumb: Crumb[] = [
        { translation: 'App' },
        { translation: 'iam.Accounts', routerLink: ['/iam/account']},
        { translation: 'iam.Account' },
    ];

    get user(): FormGroup
    {
        return this.fg.get('user') as FormGroup;
    }

    constructor(
        private readonly accountService: AccountService,
        private readonly tenantService: TenantService,
        private readonly roleService: RoleService,
        private readonly tagService: TagService,
        private readonly clientService: ClientService,
        private readonly coreGetLangsService: CoreGetLangsService,
        private readonly selectSearchService: SelectSearchService,
    )
    {
        super();

        // tenants
        this.initTenantsFilter(this.activatedRoute.snapshot.data.data.iamGetTenants);
    }

    // this method will be called after the ngOnInit of
    // the parent class you can use instead of ngOnInit
    init(): void
    {
        this.tenants$ = this.tenantService.tenants$;
        this.roles$ = this.roleService.roles$;
        this.tags$ = this.tagService.tags$;
        this.clients$ = this.clientService.clients$;
        this.langs$ = this.coreGetLangsService.langs$;

        // set all clients to be filtered according account type, and action
        this.originClients = this.clientService.clientsSubject$.value;
    }

    initTenantsFilter(tenants: IamTenant[]): void
    {
        if (tenants.length === 1)
        {
            this.fg.get('tenantIds').setValue([tenants[0].id]);
            this.showTenantsInput.set(false);
        }

        // init select filter with all items
        this.filteredTenants$.next(tenants);

        // listen for country search field value changes
        this.tenantFilterCtrl
            .valueChanges
            .pipe(takeUntilDestroyed())
            .subscribe(async () =>
            {
                this.selectSearchService
                    .filterSelect<IamTenant>(
                        this.tenantFilterCtrl,
                        tenants,
                        this.filteredTenants$,
                    );
            });
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

        // force validate repeat password, usually only validated if the value of the input changes.
        // in this case depends on the change of the password field
        this.fg.get('user.repeatPassword')?.updateValueAndValidity();

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

        // remove fields to update or create account
        this.user.removeControl('repeatPassword');

        this.actionService.action({
            id: mapActions(
                this.currentViewAction.id,
                {
                    'iam::account.detail.new' : 'iam::account.detail.create',
                    'iam::account.detail.edit': 'iam::account.detail.update',
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
            type: [null, [Validators.required]],
            code: ['', [Validators.maxLength(64)]],
            email: ['', [Validators.maxLength(128), Validators.email]],
            username: ['', [Validators.required, Validators.maxLength(128)]],
            isActive: false,
            clientId: null,
            tags: [],
            scopes: [],
            tenantIds: [[], [Validators.required]],
            hasAddChildTenants: false,
            roleIds: [],
            user: this.fb.group({
                id: '',
                name: ['', [Validators.required, Validators.maxLength(255)]],
                surname: ['', [Validators.required, Validators.maxLength(255)]],
                langId: null,
                password: '',
                repeatPassword: '',
                isTwoFactorAuthenticationEnabled: false,
            }),
        });
        /* eslint-enable key-spacing */
    }

    handleCreatePassword(): void
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

        this.fg.get('user.password').setValue(password);
        this.fg.get('user.password').markAsDirty();
        this.fg.get('user.repeatPassword').setValue(password);
        this.fg.get('user.repeatPassword').markAsDirty();
    }

    handleChangeClient(
        $event: MatOptionSelectionChange,
        client: OAuthClient,
    ): void
    {
        if ($event.isUserInput) this.scopeOptions$.next(client.scopeOptions);
    }

    handleChangeAccountType($event): void
    {
        switch ($event.value)
        {
            case IamAccountType.USER:
                this.clientService.clientsSubject$.next(
                    this.originClients
                        .filter(client => client.grantType === OAuthClientGrantType.PASSWORD),
                );

                this.setPasswordValidators(IamAccountType.USER);
                break;

            case IamAccountType.SERVICE:
                this.clientService.clientsSubject$.next(
                    this.originClients
                        .filter(client => client.grantType === OAuthClientGrantType.CLIENT_CREDENTIALS),
                );

                this.setPasswordValidators(IamAccountType.SERVICE);
                break;
        }
    }

    setPasswordValidators(accountType: IamAccountType): void
    {
        switch (accountType)
        {
            case IamAccountType.USER:
                if (this.currentViewAction.id === 'iam::account.detail.new')
                {
                    this.fg.get('user.name').setValidators([Validators.required, Validators.maxLength(255)]);
                    this.fg.get('user.surname').setValidators([Validators.required, Validators.maxLength(255)]);
                    this.fg.get('user.username').setValidators([Validators.required, Validators.email, Validators.maxLength(120)]);
                    this.fg.get('user.password').setValidators([
                        Validators.required,
                        Validators.minLength(8),
                        Validators.maxLength(30),
                        RxwebValidators.password({
                            validation: { digit: true, specialCharacter: true, lowerCase: true, upperCase: true },
                            message   : { digit: 'PasswordDigit', specialCharacter: 'PasswordSpecialCharacter', lowerCase: 'PasswordLowerCase', upperCase: 'PasswordUpperCase' },
                        }),
                    ]);
                    this.fg.get('user.repeatPassword').setValidators([Validators.required, Validators.maxLength(50), RxwebValidators.compare({ fieldName: 'password' })]);
                    this.fg.get('user.repeatPassword').updateValueAndValidity();
                }
                else if (this.currentViewAction.id === 'iam::account.detail.edit')
                {
                    this.fg.get('user.password').setValidators([
                        Validators.minLength(8),
                        Validators.maxLength(30),
                        RxwebValidators.password({
                            validation: { digit: true, specialCharacter: true, lowerCase: true, upperCase: true },
                            message   : { digit: 'PasswordDigit', specialCharacter: 'PasswordSpecialCharacter', lowerCase: 'PasswordLowerCase', upperCase: 'PasswordUpperCase' },
                        }),
                    ]);
                    this.fg.get('user.repeatPassword').setValidators([Validators.maxLength(50), RxwebValidators.compare({ fieldName: 'password' })]);
                    this.fg.get('user.repeatPassword').updateValueAndValidity();
                }
                break;

            case IamAccountType.SERVICE:
                this.fg.get('user.name').clearValidators();
                this.fg.get('user.name').updateValueAndValidity();
                this.fg.get('user.surname').clearValidators();
                this.fg.get('user.surname').updateValueAndValidity();
                this.fg.get('user.username').clearValidators();
                this.fg.get('user.username').updateValueAndValidity();
                this.fg.get('user.repeatPassword').clearValidators();
                this.fg.get('user.repeatPassword').updateValueAndValidity();
                break;
        }
    }

    async handleAction(action: Action): Promise<void>
    {
        // add optional chaining (?.) to avoid first call where behaviour subject is undefined
        switch (action?.id)
        {
            /* #region common actions */
            case 'iam::account.detail.new':
                this.fg.get('id').setValue(Utils.uuid());
                break;

            case 'iam::account.detail.edit':
                this.accountService
                    .account$
                    .pipe(takeUntil(this.unsubscribeAll$))
                    .subscribe(item =>
                    {
                        this.managedObject = item;
                        this.scopeOptions$.next(item.client.scopeOptions);

                        // account type can't be changed
                        this.fg.get('type').disable();
                        this.fg.patchValue(item);

                        // set many to many associations
                        this.fg.get('roleIds').setValue(item.roles.map(role => role.id));
                        this.fg.get('tenantIds').setValue(item.tenants.map(tenant => tenant.id));

                        this.setPasswordValidators(item.type);
                    });
                break;

            case 'iam::account.detail.create':
                try
                {
                    await lastValueFrom(
                        this.accountService
                            .create<IamAccount>({
                                object: this.fg.value,
                            }),
                    );

                    this.snackBar.open(
                        `${this.translocoService.translate('iam.Account')} ${this.translocoService.translate('Created.M')}`,
                        undefined,
                        {
                            verticalPosition: 'top',
                            duration        : 3000,
                        },
                    );

                    this.router.navigate(['iam/account']);
                }
                catch(error)
                {
                    log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
                }
                break;

            case 'iam::account.detail.update':
                try
                {
                    await lastValueFrom(
                        this.accountService
                            .updateById<IamAccount>({
                                object: this.fg.value,
                            }),
                    );

                    this.snackBar.open(
                        `${this.translocoService.translate('iam.Account')} ${this.translocoService.translate('Saved.M')}`,
                        undefined,
                        {
                            verticalPosition: 'top',
                            duration        : 3000,
                        },
                    );

                    this.router.navigate(['iam/account']);
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
