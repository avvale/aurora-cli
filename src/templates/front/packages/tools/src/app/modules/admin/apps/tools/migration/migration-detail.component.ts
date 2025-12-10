import {
    ChangeDetectionStrategy,
    Component,
    signal,
    ViewEncapsulation,
    WritableSignal,
} from '@angular/core';
import { Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ToolsMigration } from '@apps/tools';
import { MigrationService } from '@apps/tools/migration';
import {
    Action,
    ChipComponent,
    Crumb,
    DatetimepickerSqlFormatDirective,
    defaultDetailImports,
    log,
    mapActions,
    MatFormFieldAppearanceComponent,
    SnackBarInvalidFormComponent,
    uuid,
    ViewDetailComponent,
} from '@aurora';
import { MtxDatetimepickerModule } from '@ng-matero/extensions/datetimepicker';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { lastValueFrom, takeUntil } from 'rxjs';

@Component({
    selector: 'tools-migration-detail',
    templateUrl: './migration-detail.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ...defaultDetailImports,
        ChipComponent,
        DatetimepickerSqlFormatDirective,
        MatCheckboxModule,
        MtxDatetimepickerModule,
        MatFormFieldAppearanceComponent,
        MonacoEditorModule,
    ],
})
export class MigrationDetailComponent extends ViewDetailComponent {
    // ---- customizations ----
    editorOptions = { theme: 'vs', language: 'sql', readOnly: true };

    // Object retrieved from the database request,
    // it should only be used to obtain uninitialized
    // data in the form, such as relations, etc.
    // It should not be used habitually, since the source of truth is the form.
    managedObject: WritableSignal<ToolsMigration> = signal(null);

    // breadcrumb component definition
    breadcrumb: Crumb[] = [
        { translation: 'App' },
        { translation: 'tools.Migrations', routerLink: ['/tools/migration'] },
        { translation: 'tools.Migration' },
    ];

    constructor(private readonly migrationService: MigrationService) {
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
                'tools::migration.detail.new': 'tools::migration.detail.create',
                'tools::migration.detail.edit':
                    'tools::migration.detail.update',
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
            name: [
                { value: '', disabled: true },
                [Validators.required, Validators.maxLength(128)],
            ],
            version: [
                { value: '', disabled: true },
                [Validators.required, Validators.maxLength(16)],
            ],
            isActive: [false, [Validators.required]],
            upScript: '',
            downScript: '',
            sort: [{ value: null, disabled: true }],
            executedAt: [{ value: '', disabled: true }],
        });
        /* eslint-enable key-spacing */
    }

    async handleAction(action: Action): Promise<void> {
        // add optional chaining (?.) to avoid first call where behaviour subject is undefined
        switch (action?.id) {
            /* #region common actions */
            case 'tools::migration.detail.new':
                this.fg.get('id').setValue(uuid());
                break;

            case 'tools::migration.detail.edit':
                this.migrationService.migration$
                    .pipe(takeUntil(this.unsubscribeAll$))
                    .subscribe((item) => {
                        this.managedObject.set(item);
                        this.fg.patchValue(item);
                    });
                break;

            case 'tools::migration.detail.create':
                try {
                    await lastValueFrom(
                        this.migrationService.create<ToolsMigration>({
                            object: this.fg.value,
                        }),
                    );

                    this.snackBar.open(
                        `${this.translocoService.translate('tools.Migration')} ${this.translocoService.translate('Created.M')}`,
                        undefined,
                        {
                            verticalPosition: 'top',
                            duration: 3000,
                        },
                    );

                    this.router.navigate(['tools/migration']);
                } catch (error) {
                    log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
                }
                break;

            case 'tools::migration.detail.update':
                try {
                    await lastValueFrom(
                        this.migrationService.updateById<ToolsMigration>({
                            object: this.fg.value,
                        }),
                    );

                    this.snackBar.open(
                        `${this.translocoService.translate('tools.Migration')} ${this.translocoService.translate('Saved.M')}`,
                        undefined,
                        {
                            verticalPosition: 'top',
                            duration: 3000,
                        },
                    );

                    this.router.navigate(['tools/migration']);
                } catch (error) {
                    log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
                }
                break;
            /* #endregion common actions */

            /* #region script actions */
            case 'tools::migration.detail.upScript':
                const deleteDialogRef = this.confirmationService.open({
                    title: `${this.translocoService.translate('Install')} ${this.translocoService.translate('tools.Script')}`,
                    message: this.translocoService.translate(
                        'tools.InstallWarning',
                        { name: this.fg.get('name').value },
                    ),
                    icon: {
                        show: true,
                        name: 'heroicons_outline:exclamation-triangle',
                        color: 'warn',
                    },
                    actions: {
                        confirm: {
                            show: true,
                            label: this.translocoService.translate('Install'),
                            color: 'warn',
                        },
                        cancel: {
                            show: true,
                            label: this.translocoService.translate('Cancel'),
                        },
                    },
                    dismissible: true,
                });

                deleteDialogRef.afterClosed().subscribe(async (result) => {
                    if (result === 'confirmed') {
                        try {
                            await lastValueFrom(
                                this.migrationService.upScriptMigration<ToolsMigration>(
                                    {
                                        migrationId: this.managedObject().id,
                                    },
                                ),
                            );

                            this.snackBar.open(
                                `${this.translocoService.translate('tools.Script')} ${this.translocoService.translate('Installed.M')}`,
                                undefined,
                                {
                                    verticalPosition: 'top',
                                    duration: 3000,
                                },
                            );
                        } catch (error) {
                            log(
                                `[DEBUG] Catch error in ${action.id} action: ${error}`,
                            );
                        }
                    }
                });
                break;

            case 'tools::migration.detail.downScript':
                const downScriptDialogRef = this.confirmationService.open({
                    title: `${this.translocoService.translate('Uninstall')} ${this.translocoService.translate('tools.Script')}`,
                    message: this.translocoService.translate(
                        'tools.UninstallWarning',
                        { name: this.fg.get('name').value },
                    ),
                    icon: {
                        show: true,
                        name: 'heroicons_outline:exclamation-triangle',
                        color: 'warn',
                    },
                    actions: {
                        confirm: {
                            show: true,
                            label: this.translocoService.translate('Uninstall'),
                            color: 'warn',
                        },
                        cancel: {
                            show: true,
                            label: this.translocoService.translate('Cancel'),
                        },
                    },
                    dismissible: true,
                });

                downScriptDialogRef.afterClosed().subscribe(async (result) => {
                    if (result === 'confirmed') {
                        try {
                            await lastValueFrom(
                                this.migrationService.downScriptMigration<ToolsMigration>(
                                    {
                                        migrationId: this.managedObject().id,
                                    },
                                ),
                            );

                            this.snackBar.open(
                                `${this.translocoService.translate('tools.Script')} ${this.translocoService.translate('Uninstalled.M')}`,
                                undefined,
                                {
                                    verticalPosition: 'top',
                                    duration: 3000,
                                },
                            );
                        } catch (error) {
                            log(
                                `[DEBUG] Catch error in ${action.id} action: ${error}`,
                            );
                        }
                    }
                });
                break;
            /* #endregion script actions */
        }
    }
}
