import { ChangeDetectionStrategy, Component, signal, ViewEncapsulation, WritableSignal } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { ToolsProcedure, ToolsProcedureType } from '@apps/tools';
import { ProcedureService } from '@apps/tools/procedure';
import { Action, ChipComponent, Crumb, DatetimepickerSqlFormatDirective, defaultDetailImports, log, mapActions, MatFormFieldAppearanceComponent, SnackBarInvalidFormComponent, uuid, ViewDetailComponent } from '@aurora';
import { MtxDatetimepickerModule } from '@ng-matero/extensions/datetimepicker';
import { lastValueFrom, takeUntil } from 'rxjs';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { KeyValuePipe } from '@angular/common';

@Component({
    selector: 'tools-procedure-detail',
    templateUrl: './procedure-detail.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ...defaultDetailImports,
        ChipComponent, DatetimepickerSqlFormatDirective, KeyValuePipe,
        MatCheckboxModule, MatFormFieldAppearanceComponent,
        MatSelectModule, MonacoEditorModule, MtxDatetimepickerModule,
    ],
})
export class ProcedureDetailComponent extends ViewDetailComponent
{
    // ---- customizations ----
    editorOptions = { theme: 'vs', language: 'sql', readOnly: true };
    toolsProcedureType = ToolsProcedureType;

    // Object retrieved from the database request,
    // it should only be used to obtain uninitialized
    // data in the form, such as relations, etc.
    // It should not be used habitually, since the source of truth is the form.
    managedObject: WritableSignal<ToolsProcedure> = signal(null);

    // breadcrumb component definition
    breadcrumb: Crumb[] = [
        { translation: 'App' },
        { translation: 'tools.Procedures', routerLink: ['/tools/procedure']},
        { translation: 'tools.Procedure' },
    ];

    constructor(
        private readonly procedureService: ProcedureService,
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
                        message: `${this.translocoService.translate('InvalidForm')}`,
                        textButton: `${this.translocoService.translate('InvalidFormOk')}`,
                    },
                    panelClass: 'error-snackbar',
                    verticalPosition: 'top',
                    duration: 10000,
                },
            );
            return;
        }

        this.actionService.action({
            id: mapActions(
                this.currentViewAction.id,
                {
                    'tools::procedure.detail.new' : 'tools::procedure.detail.create',
                    'tools::procedure.detail.edit': 'tools::procedure.detail.update',
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
            name: [{ value: '', disabled: true }, [Validators.required, Validators.maxLength(128)]],
            type: [{ value: null, disabled: true }, [Validators.required]],
            version: [{ value: '', disabled: true }, [Validators.required, Validators.maxLength(16)]],
            isActive: [false, [Validators.required]],
            upScript: '',
            downScript: '',
            sort: [{ value: null, disabled: true }],
            executedAt: [{ value: '', disabled: true }],
        });
        /* eslint-enable key-spacing */
    }

    async handleAction(action: Action): Promise<void>
    {
        // add optional chaining (?.) to avoid first call where behaviour subject is undefined
        switch (action?.id)
        {
            /* #region common actions */
            case 'tools::procedure.detail.new':
                this.fg.get('id').setValue(uuid());
                break;

            case 'tools::procedure.detail.edit':
                this.procedureService
                    .procedure$
                    .pipe(takeUntil(this.unsubscribeAll$))
                    .subscribe(item =>
                    {
                        this.managedObject.set(item);
                        this.fg.patchValue(item);
                    });
                break;

            case 'tools::procedure.detail.create':
                try
                {
                    await lastValueFrom(
                        this.procedureService
                            .create<ToolsProcedure>({
                                object: this.fg.value,
                            }),
                    );

                    this.snackBar.open(
                        `${this.translocoService.translate('tools.Procedure')} ${this.translocoService.translate('Created.M')}`,
                        undefined,
                        {
                            verticalPosition: 'top',
                            duration: 3000,
                        },
                    );

                    this.router.navigate(['tools/procedure']);
                }
                catch(error)
                {
                    log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
                }
                break;

            case 'tools::procedure.detail.update':
                try
                {
                    await lastValueFrom(
                        this.procedureService
                            .updateById<ToolsProcedure>({
                                object: this.fg.value,
                            }),
                    );

                    this.snackBar.open(
                        `${this.translocoService.translate('tools.Procedure')} ${this.translocoService.translate('Saved.M')}`,
                        undefined,
                        {
                            verticalPosition: 'top',
                            duration: 3000,
                        },
                    );

                    this.router.navigate(['tools/procedure']);
                }
                catch(error)
                {
                    log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
                }
                break;
                /* #endregion common actions */

            /* #region script actions */
            case 'tools::procedure.detail.upScript':
                const deleteDialogRef = this.confirmationService.open({
                    title  : `${this.translocoService.translate('Install')} ${this.translocoService.translate('tools.Script')}`,
                    message: this.translocoService.translate('tools.InstallWarning', { name: this.fg.get('name').value }),
                    icon   : {
                        show : true,
                        name : 'heroicons_outline:exclamation-triangle',
                        color: 'warn',
                    },
                    actions: {
                        confirm: {
                            show : true,
                            label: this.translocoService.translate('Install'),
                            color: 'warn',
                        },
                        cancel: {
                            show : true,
                            label: this.translocoService.translate('Cancel'),
                        },
                    },
                    dismissible: true,
                });

                deleteDialogRef.afterClosed()
                    .subscribe(async result =>
                    {
                        if (result === 'confirmed')
                        {
                            try
                            {
                                await lastValueFrom(
                                    this.procedureService
                                        .upScriptProcedure<ToolsProcedure>({
                                            procedureId: this.managedObject().id,
                                        }),
                                );

                                this.snackBar.open(
                                    `${this.translocoService.translate('tools.Script')} ${this.translocoService.translate('Installed.M')}`,
                                    undefined,
                                    {
                                        verticalPosition: 'top',
                                        duration        : 3000,
                                    },
                                );
                            }
                            catch(error)
                            {
                                log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
                            }
                        }
                    });
                break;

            case 'tools::procedure.detail.downScript':
                const downScriptDialogRef = this.confirmationService.open({
                    title  : `${this.translocoService.translate('Uninstall')} ${this.translocoService.translate('tools.Script')}`,
                    message: this.translocoService.translate('tools.UninstallWarning', { name: this.fg.get('name').value }),
                    icon   : {
                        show : true,
                        name : 'heroicons_outline:exclamation-triangle',
                        color: 'warn',
                    },
                    actions: {
                        confirm: {
                            show : true,
                            label: this.translocoService.translate('Uninstall'),
                            color: 'warn',
                        },
                        cancel: {
                            show : true,
                            label: this.translocoService.translate('Cancel'),
                        },
                    },
                    dismissible: true,
                });

                downScriptDialogRef.afterClosed()
                    .subscribe(async result =>
                    {
                        if (result === 'confirmed')
                        {
                            try
                            {
                                await lastValueFrom(
                                    this.procedureService
                                        .downScriptProcedure<ToolsProcedure>({
                                            procedureId: this.managedObject().id,
                                        }),
                                );

                                this.snackBar.open(
                                    `${this.translocoService.translate('tools.Script')} ${this.translocoService.translate('Uninstalled.M')}`,
                                    undefined,
                                    {
                                        verticalPosition: 'top',
                                        duration        : 3000,
                                    },
                                );
                            }
                            catch(error)
                            {
                                log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
                            }
                        }
                    });
                break;
                /* #endregion script actions */
        }
    }
}
