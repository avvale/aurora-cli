/**
 * @aurora-generated
 * @source cliter/common/resource.aurora.yaml
 */
import {
    ChangeDetectionStrategy,
    Component,
    signal,
    ViewEncapsulation,
    WritableSignal,
} from '@angular/core';
import { Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonResource } from '@apps/common';
import { ResourceService } from '@apps/common/resource';
import {
    Action,
    ActionScope,
    Crumb,
    defaultDetailImports,
    log,
    mapActions,
    SnackBarInvalidFormComponent,
    uuid,
    ViewDetailComponent,
} from '@aurora';
import { lastValueFrom, takeUntil } from 'rxjs';

@Component({
    selector: 'common-resource-detail',
    templateUrl: './resource-detail.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [...defaultDetailImports, MatCheckboxModule],
})
@ActionScope('common::resource.detail')
export class ResourceDetailComponent extends ViewDetailComponent {
    // ---- customizations ----
    // ..

    // Object retrieved from the database request,
    // it should only be used to obtain uninitialized
    // data in the form, such as relations, etc.
    // It should not be used habitually, since the source of truth is the form.
    managedObject: WritableSignal<CommonResource> = signal(null);

    // breadcrumb component definition
    breadcrumb: Crumb[] = [
        { translation: 'App' },
        { translation: 'common.Resources', routerLink: ['/common/resource'] },
        { translation: 'common.Resource' },
    ];

    constructor(private readonly resourceService: ResourceService) {
        super();
    }

    // this method will be called after the ngOnInit of
    // the parent class you can use instead of ngOnInit
    init(): void {
        /**/
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
                'common::resource.detail.new': 'common::resource.detail.create',
                'common::resource.detail.edit':
                    'common::resource.detail.update',
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
            isActive: [false, [Validators.required]],
            hasAttachments: [false, [Validators.required]],
        });
        /* eslint-enable key-spacing */
    }

    async handleAction(action: Action): Promise<void> {
        // add optional chaining (?.) to avoid first call where behaviour subject is undefined
        switch (action?.id) {
            /* #region common actions */
            case 'common::resource.detail.new':
                this.fg.get('id').setValue(uuid());
                break;

            case 'common::resource.detail.edit':
                this.resourceService.resource$
                    .pipe(takeUntil(this.unsubscribeAll$))
                    .subscribe((item) => {
                        this.managedObject.set(item);
                        this.fg.patchValue(item);
                    });
                break;

            case 'common::resource.detail.create':
                try {
                    await lastValueFrom(
                        this.resourceService.create<CommonResource>({
                            object: this.fg.value,
                        }),
                    );

                    this.snackBar.open(
                        `${this.translocoService.translate('common.Resource')} ${this.translocoService.translate('Created.M')}`,
                        undefined,
                        {
                            verticalPosition: 'top',
                            duration: 3000,
                        },
                    );

                    this.router.navigate(['common/resource']);
                } catch (error) {
                    log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
                }
                break;

            case 'common::resource.detail.update':
                try {
                    await lastValueFrom(
                        this.resourceService.updateById<CommonResource>({
                            object: this.fg.value,
                        }),
                    );

                    this.snackBar.open(
                        `${this.translocoService.translate('common.Resource')} ${this.translocoService.translate('Saved.M')}`,
                        undefined,
                        {
                            verticalPosition: 'top',
                            duration: 3000,
                        },
                    );

                    this.router.navigate(['common/resource']);
                } catch (error) {
                    log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
                }
                break;
            /* #endregion common actions */
        }
    }
}
