import { ChangeDetectionStrategy, Component, signal, ViewEncapsulation, WritableSignal } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { ToolsKeyValue } from '@apps/tools';
import { KeyValueService } from '@apps/tools/key-value';
import { Action, Crumb, defaultDetailImports, log, mapActions, SnackBarInvalidFormComponent, uuid, ViewDetailComponent } from '@aurora';
import { lastValueFrom, takeUntil } from 'rxjs';

@Component({
    selector: 'tools-key-value-detail',
    templateUrl: './key-value-detail.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ...defaultDetailImports,
        MatCheckboxModule, MatSelectModule,
    ],
})
export class KeyValueDetailComponent extends ViewDetailComponent
{
    // ---- customizations ----
    // ..

    // Object retrieved from the database request,
    // it should only be used to obtain uninitialized
    // data in the form, such as relations, etc.
    // It should not be used habitually, since the source of truth is the form.
    managedObject: WritableSignal<ToolsKeyValue> = signal(null);

    // breadcrumb component definition
    breadcrumb: Crumb[] = [
        { translation: 'App' },
        { translation: 'tools.KeyValues', routerLink: ['/tools/key-value']},
        { translation: 'tools.KeyValue' },
    ];

    constructor(
        private readonly keyValueService: KeyValueService,
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
                    'tools::keyValue.detail.new' : 'tools::keyValue.detail.create',
                    'tools::keyValue.detail.edit': 'tools::keyValue.detail.update',
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
            key: ['', [Validators.required, Validators.maxLength(64)]],
            type: [null, [Validators.required]],
            value: ['', [Validators.required]],
            isActive: [true, [Validators.required]],
            description: '',
        });
        /* eslint-enable key-spacing */
    }

    async handleAction(action: Action): Promise<void>
    {
        // add optional chaining (?.) to avoid first call where behaviour subject is undefined
        switch (action?.id)
        {
            /* #region common actions */
            case 'tools::keyValue.detail.new':
                this.fg.get('id').setValue(uuid());
                break;

            case 'tools::keyValue.detail.edit':
                this.keyValueService
                    .keyValue$
                    .pipe(takeUntil(this.unsubscribeAll$))
                    .subscribe(item =>
                    {
                        this.managedObject.set(item);
                        this.fg.patchValue(item);
                    });
                break;

            case 'tools::keyValue.detail.create':
                try
                {
                    await lastValueFrom(
                        this.keyValueService
                            .create<ToolsKeyValue>({
                                object: this.fg.value,
                            }),
                    );

                    this.snackBar.open(
                        `${this.translocoService.translate('tools.KeyValue')} ${this.translocoService.translate('Created.M')}`,
                        undefined,
                        {
                            verticalPosition: 'top',
                            duration: 3000,
                        },
                    );

                    this.router.navigate(['tools/key-value']);
                }
                catch(error)
                {
                    log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
                }
                break;

            case 'tools::keyValue.detail.update':
                try
                {
                    await lastValueFrom(
                        this.keyValueService
                            .updateById<ToolsKeyValue>({
                                object: this.fg.value,
                            }),
                    );

                    this.snackBar.open(
                        `${this.translocoService.translate('tools.KeyValue')} ${this.translocoService.translate('Saved.M')}`,
                        undefined,
                        {
                            verticalPosition: 'top',
                            duration: 3000,
                        },
                    );

                    this.router.navigate(['tools/key-value']);
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
