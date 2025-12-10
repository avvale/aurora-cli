import {
    ChangeDetectionStrategy,
    Component,
    ViewEncapsulation,
    WritableSignal,
    signal,
} from '@angular/core';
import { Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { IamRole } from '@apps/iam/iam.types';
import { RoleService } from '@apps/iam/role/role.service';
import { OAuthScope } from '@apps/o-auth';
import { ScopeService } from '@apps/o-auth/scope';
import {
    Action,
    Crumb,
    SnackBarInvalidFormComponent,
    ViewDetailComponent,
    defaultDetailImports,
    log,
    mapActions,
    uuid,
} from '@aurora';
import { Observable, lastValueFrom, takeUntil } from 'rxjs';

@Component({
    selector: 'o-auth-scope-detail',
    templateUrl: './scope-detail.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [...defaultDetailImports, MatSelectModule],
})
export class ScopeDetailComponent extends ViewDetailComponent {
    // ---- customizations ----
    roles$: Observable<IamRole[]>;

    // Object retrieved from the database request,
    // it should only be used to obtain uninitialized
    // data in the form, such as relations, etc.
    // It should not be used habitually, since the source of truth is the form.
    managedObject: WritableSignal<OAuthScope> = signal(null);

    // breadcrumb component definition
    breadcrumb: Crumb[] = [
        { translation: 'App' },
        { translation: 'oAuth.Scopes', routerLink: ['/o-auth/scope'] },
        { translation: 'oAuth.Scope' },
    ];

    constructor(
        private readonly scopeService: ScopeService,
        private readonly roleService: RoleService,
    ) {
        super();
    }

    // this method will be called after the ngOnInit of
    // the parent class you can use instead of ngOnInit
    init(): void {
        /**/
        this.roles$ = this.roleService.roles$;
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
                'oAuth::scope.detail.new': 'oAuth::scope.detail.create',
                'oAuth::scope.detail.edit': 'oAuth::scope.detail.update',
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
            code: ['', [Validators.required, Validators.maxLength(64)]],
            name: ['', [Validators.required, Validators.maxLength(128)]],
            roleIds: [],
        });
        /* eslint-enable key-spacing */
    }

    async handleAction(action: Action): Promise<void> {
        // add optional chaining (?.) to avoid first call where behaviour subject is undefined
        switch (action?.id) {
            /* #region common actions */
            case 'oAuth::scope.detail.new':
                this.fg.get('id').setValue(uuid());
                break;

            case 'oAuth::scope.detail.edit':
                this.scopeService.scope$
                    .pipe(takeUntil(this.unsubscribeAll$))
                    .subscribe((item) => {
                        this.managedObject.set(item);
                        this.fg.patchValue(item);
                    });
                break;

            case 'oAuth::scope.detail.create':
                try {
                    await lastValueFrom(
                        this.scopeService.create<OAuthScope>({
                            object: this.fg.value,
                        }),
                    );

                    this.snackBar.open(
                        `${this.translocoService.translate('oAuth.Scope')} ${this.translocoService.translate('Created.M')}`,
                        undefined,
                        {
                            verticalPosition: 'top',
                            duration: 3000,
                        },
                    );

                    this.router.navigate(['o-auth/scope']);
                } catch (error) {
                    log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
                }
                break;

            case 'oAuth::scope.detail.update':
                try {
                    await lastValueFrom(
                        this.scopeService.updateById<OAuthScope>({
                            object: this.fg.value,
                        }),
                    );

                    this.snackBar.open(
                        `${this.translocoService.translate('oAuth.Scope')} ${this.translocoService.translate('Saved.M')}`,
                        undefined,
                        {
                            verticalPosition: 'top',
                            duration: 3000,
                        },
                    );

                    this.router.navigate(['o-auth/scope']);
                } catch (error) {
                    log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
                }
                break;
            /* #endregion common actions */
        }
    }
}
