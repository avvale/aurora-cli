import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import { KeyValuePipe, NgForOf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Injector, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionSelectionChange } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Action, Crumb, Utils, ViewDetailComponent, defaultDetailImports, log, mapActions } from '@aurora';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { BehaviorSubject, Observable, lastValueFrom, takeUntil } from 'rxjs';
import { ClientService } from '../../o-auth/client/client.service';
import { OAuthClient, OAuthClientGrantType, OAuthScope } from '../../o-auth/o-auth.types';
import { IamAccount, IamAccountType, IamRole, IamTenant } from '../iam.types';
import { RoleService } from '../role/role.service';
import { TenantService } from '../tenant/tenant.service';
import { AccountService } from './account.service';

@Component({
    selector       : 'iam-account-detail',
    templateUrl    : './account-detail.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone     : true,
    imports        : [
        ...defaultDetailImports,
        KeyValuePipe, MatCheckboxModule, MatPasswordStrengthModule, MatSelectModule, MatToolbarModule, NgForOf,
    ],
})
export class AccountDetailComponent extends ViewDetailComponent
{
    // ---- customizations ----
    iamAccountType = IamAccountType;
    tenants$: Observable<IamTenant[]>;
    roles$: Observable<IamRole[]>;
    clients$: Observable<OAuthClient[]>;
    originClients: OAuthClient[];
    isShowPassword: boolean = false;
    scopeOptions$: BehaviorSubject<OAuthScope[]> = new BehaviorSubject<OAuthScope[]>([]);

    // Object retrieved from the database request,
    // it should only be used to obtain uninitialized
    // data in the form, such as relations, etc.
    // It should not be used habitually, since the source of truth is the form.
    managedObject: IamAccount;

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
        protected readonly injector: Injector,
        private readonly accountService: AccountService,
        private readonly tenantService: TenantService,
        private readonly roleService: RoleService,
        private readonly clientService: ClientService,
    )
    {
        super();
    }

    // this method will be called after the ngOnInit of
    // the parent class you can use instead of ngOnInit
    init(): void
    {
        this.tenants$ = this.tenantService.tenants$;
        this.roles$ = this.roleService.roles$;
        this.clients$ = this.clientService.clients$;

        // set all clients to be filtered according account type, and action
        this.originClients = this.clientService.clientsSubject$.value;
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
        this.fg = this.fb.group({
            id       : ['', [Validators.required, Validators.minLength(36), Validators.maxLength(36)]],
            type     : ['', [Validators.required]],
            code     : ['', [Validators.maxLength(50)]],
            email    : ['', [Validators.required, Validators.maxLength(120)]],
            isActive : false,
            clientId : '',
            scopes   : [],
            tenantIds: [],
            roleIds  : [],
            user     : this.fb.group({
                id            : '',
                name          : ['', [Validators.required, Validators.maxLength(255)]],
                surname       : ['', [Validators.required, Validators.maxLength(255)]],
                //langId        : '',
                username      : ['', [Validators.required, Validators.email, Validators.maxLength(120)]],
                password      : '',
                repeatPassword: '',
            }),
        });
    }

    handleCreatePassword(): void
    {
        const password = Utils.createPassword({
            length : 10,
            numbers: true,
        });

        this.fg.get('user.password').setValue(password);
        this.fg.get('user.repeatPassword').setValue(password);
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
                    this.fg.get('user.password').setValidators([Validators.required, Validators.maxLength(50)]);
                    this.fg.get('user.repeatPassword').setValidators([Validators.required, Validators.maxLength(50), RxwebValidators.compare({ fieldName: 'password' })]);
                    this.fg.get('user.repeatPassword').updateValueAndValidity();
                }
                else if (this.currentViewAction.id === 'iam::account.detail.edit')
                {
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
