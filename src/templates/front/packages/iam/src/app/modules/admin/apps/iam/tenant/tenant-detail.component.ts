import {
    ChangeDetectionStrategy,
    Component,
    signal,
    ViewEncapsulation,
    WritableSignal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { IamTenant } from '@apps/iam/iam.types';
import { TenantService } from '@apps/iam/tenant';
import {
    Action,
    Crumb,
    defaultDetailImports,
    log,
    mapActions,
    SelectSearchService,
    SnackBarInvalidFormComponent,
    uuid,
    ViewDetailComponent,
} from '@aurora';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { lastValueFrom, Observable, ReplaySubject, takeUntil } from 'rxjs';

@Component({
    selector: 'iam-tenant-detail',
    templateUrl: './tenant-detail.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ...defaultDetailImports,
        MatCheckboxModule,
        MatSelectModule,
        NgxMatSelectSearchModule,
    ],
})
export class TenantDetailComponent extends ViewDetailComponent {
    // ---- customizations ----
    // parent tenant filter
    parentTenantFilterCtrl: FormControl = new FormControl<string>('');
    filteredParentTenants$: ReplaySubject<IamTenant[]> = new ReplaySubject<
        IamTenant[]
    >(1);

    // Object retrieved from the database request,
    // it should only be used to obtain uninitialized
    // data in the form, such as relations, etc.
    // It should not be used habitually, since the source of truth is the form.
    managedObject: WritableSignal<IamTenant> = signal(null);

    // relationships
    parentTenants$: Observable<IamTenant[]>;

    // breadcrumb component definition
    breadcrumb: Crumb[] = [
        { translation: 'App' },
        { translation: 'iam.Tenants', routerLink: ['/iam/tenant'] },
        { translation: 'iam.Tenant' },
    ];

    constructor(
        private readonly tenantService: TenantService,
        private readonly selectSearchService: SelectSearchService,
    ) {
        super();

        // organizational entities
        this.initParentTenantsFilter(
            this.activatedRoute.snapshot.data.data.iamGetTenants,
        );
    }

    // this method will be called after the ngOnInit of
    // the parent class you can use instead of ngOnInit
    init(): void {
        /**/
        this.parentTenants$ = this.tenantService.tenants$;
    }

    initParentTenantsFilter(parentTenants: IamTenant[]): void {
        // init select filter with all items
        this.filteredParentTenants$.next(parentTenants);

        // listen for country search field value changes
        this.parentTenantFilterCtrl.valueChanges
            .pipe(takeUntilDestroyed())
            .subscribe(async () => {
                this.selectSearchService.filterSelect<IamTenant>(
                    this.parentTenantFilterCtrl,
                    parentTenants,
                    this.filteredParentTenants$,
                );
            });
    }

    onSubmit($event): void {
        // we have two nested forms, we check that the submit comes from the button
        // that corresponds to the main form to the main form
        if (
            $event.submitter.getAttribute('form') !==
            $event.submitter.form.getAttribute('id')
        ) {
            $event.preventDefault();
            $event.stopPropagation();
            return;
        }

        // manage validations before execute actions
        if (this.fg.invalid) {
            log('[DEBUG] Error to validate form: ', this.fg);
            this.validationMessagesService.validate();

            this.snackBar.openFromComponent(SnackBarInvalidFormComponent, {
                data: {
                    message: `${this.translocoService.translate('InvalidForm')}`,
                    textButton: `${this.translocoService.translate('InvalidFormOk')}`,
                },
                panelClass: 'error-snackbar',
                verticalPosition: 'top',
                duration: 10000,
            });
            return;
        }

        this.actionService.action({
            id: mapActions(this.currentViewAction.id, {
                'iam::tenant.detail.new': 'iam::tenant.detail.create',
                'iam::tenant.detail.edit': 'iam::tenant.detail.update',
            }),
            isViewAction: false,
        });
    }

    createForm(): void {
        /* eslint-disable key-spacing */
        this.fg = this.fb.group({
            id: [
                '',
                [
                    Validators.required,
                    Validators.minLength(36),
                    Validators.maxLength(36),
                ],
            ],
            parentId: [
                null,
                [Validators.minLength(36), Validators.maxLength(36)],
            ],
            name: ['', [Validators.required, Validators.maxLength(128)]],
            code: ['', [Validators.maxLength(64)]],
            logo: null,
            isActive: [false, [Validators.required]],
            accountIds: [],
        });
        /* eslint-enable key-spacing */
    }

    async handleAction(action: Action): Promise<void> {
        // add optional chaining (?.) to avoid first call where behaviour subject is undefined
        switch (action?.id) {
            /* #region common actions */
            case 'iam::tenant.detail.new':
                this.fg.get('id').setValue(uuid());
                break;

            case 'iam::tenant.detail.edit':
                this.tenantService.tenant$
                    .pipe(takeUntil(this.unsubscribeAll$))
                    .subscribe((item) => {
                        this.managedObject.set(item);
                        this.fg.patchValue(item);
                    });
                break;

            case 'iam::tenant.detail.create':
                try {
                    await lastValueFrom(
                        this.tenantService.create<IamTenant>({
                            object: this.fg.value,
                        }),
                    );

                    this.snackBar.open(
                        `${this.translocoService.translate('iam.Tenant')} ${this.translocoService.translate('Created.M')}`,
                        undefined,
                        {
                            verticalPosition: 'top',
                            duration: 3000,
                        },
                    );

                    this.router.navigate(['iam/tenant']);
                } catch (error) {
                    log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
                }
                break;

            case 'iam::tenant.detail.update':
                try {
                    await lastValueFrom(
                        this.tenantService.updateById<IamTenant>({
                            object: this.fg.value,
                        }),
                    );

                    this.snackBar.open(
                        `${this.translocoService.translate('iam.Tenant')} ${this.translocoService.translate('Saved.M')}`,
                        undefined,
                        {
                            verticalPosition: 'top',
                            duration: 3000,
                        },
                    );

                    this.router.navigate(['iam/tenant']);
                } catch (error) {
                    log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
                }
                break;
            /* #endregion common actions */
        }
    }
}
