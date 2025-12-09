import {
    ChangeDetectionStrategy,
    Component,
    signal,
    ViewEncapsulation,
    WritableSignal,
} from '@angular/core';
import { Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { SupportConfig } from '@apps/support';
import {
    CLICKUP_TASK_PLATFORM_API_KEY,
    CLICKUP_TASK_PLATFORM_FOLDER_ID,
    CLICKUP_TASK_PLATFORM_LIST_ID,
    CLICKUP_TASK_PLATFORM_SPACE_ID,
    CLICKUP_TASK_PLATFORM_TEAM_ID,
    CLICKUP_TASK_PLATFORM_WEBHOOK_ID,
    ClickupFolder,
    ClickupList,
    ClickupService,
    ClickupSpace,
} from '@apps/support/click-up';
import { ToolsKeyValue } from '@apps/tools';
import { KeyValueService } from '@apps/tools/key-value';
import {
    Action,
    Crumb,
    defaultDetailImports,
    log,
    mapActions,
    SnackBarInvalidFormComponent,
    ViewDetailComponent,
} from '@aurora';
import { lastValueFrom, Observable, takeUntil } from 'rxjs';
import { IssueService } from '../issue';

@Component({
    selector: 'support-config-detail',
    templateUrl: './config-detail.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [...defaultDetailImports, MatSelectModule],
})
export class ConfigDetailComponent extends ViewDetailComponent {
    // ---- customizations ----
    spaces$: Observable<ClickupSpace[]>;
    folders$: Observable<ClickupFolder[]>;
    lists$: Observable<ClickupList[]>;
    apiKey: ToolsKeyValue;
    teamId: ToolsKeyValue;
    spaceId: ToolsKeyValue;
    folderId: ToolsKeyValue;
    listId: ToolsKeyValue;
    webhookId: ToolsKeyValue;

    // Object retrieved from the database request,
    // it should only be used to obtain uninitialized
    // data in the form, such as relations, etc.
    // It should not be used habitually, since the source of truth is the form.
    managedObject: WritableSignal<SupportConfig> = signal(null);

    // breadcrumb component definition
    breadcrumb: Crumb[] = [
        { translation: 'App' },
        { translation: 'support.Configs', routerLink: ['/support/config'] },
        { translation: 'support.Config' },
    ];

    constructor(
        private readonly keyValueService: KeyValueService,
        private readonly clickupService: ClickupService,
        private readonly issueService: IssueService,
    ) {
        super();
    }

    // this method will be called after the ngOnInit of
    // the parent class you can use instead of ngOnInit
    init(): void {
        this.spaces$ = this.clickupService.spaces$;
        this.folders$ = this.clickupService.folders$;
        this.lists$ = this.clickupService.lists$;
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
                'support::config.detail.new': 'support::config.detail.create',
                'support::config.detail.edit': 'support::config.detail.update',
            }),
            isViewAction: false,
        });
    }

    createForm(): void {
        /* eslint-disable key-spacing */
        this.fg = this.fb.group({
            apiKey: ['', [Validators.maxLength(255)]],
            teamId: ['', [Validators.maxLength(255)]],
            spaceId: ['', [Validators.maxLength(255)]],
            folderId: ['', [Validators.maxLength(255)]],
            listId: ['', [Validators.maxLength(255)]],
            webhookId: [
                { value: '', disabled: true },
                [Validators.maxLength(255)],
            ],
        });
        /* eslint-enable key-spacing */
    }

    handleChangeApiKey(event: Event): void {
        const inputElement = event.target as HTMLInputElement;
        const apiKeyValue = inputElement.value;
        // console.log('API Key changed to:', apiKeyValue);
        // Add any additional logic you want to execute when the API key changes
    }

    async handleChangeSpace($event, space: ClickupSpace): Promise<void> {
        if ($event.isUserInput) {
            this.fg.patchValue({
                folderId: '',
                listId: '',
            });

            await lastValueFrom(
                this.clickupService.getFolders({ spaceId: space.id }),
            );
        }
    }

    async handleChangeFolder($event, folder: ClickupFolder): Promise<void> {
        if ($event.isUserInput) {
            this.fg.patchValue({
                listId: '',
            });

            await lastValueFrom(
                this.clickupService.getLists({ folderId: folder.id }),
            );
        }
    }

    async handleAction(action: Action): Promise<void> {
        // add optional chaining (?.) to avoid first call where behaviour subject is undefined
        switch (action?.id) {
            /* #region common actions */
            case 'support::config.detail.edit':
                this.keyValueService.keyValues$
                    .pipe(takeUntil(this.unsubscribeAll$))
                    .subscribe((keyValues) => {
                        // this.managedObject.set(item);
                        this.apiKey = keyValues.find(
                            (keyValue) =>
                                keyValue.key === CLICKUP_TASK_PLATFORM_API_KEY,
                        );
                        this.teamId = keyValues.find(
                            (keyValue) =>
                                keyValue.key === CLICKUP_TASK_PLATFORM_TEAM_ID,
                        );
                        this.spaceId = keyValues.find(
                            (keyValue) =>
                                keyValue.key === CLICKUP_TASK_PLATFORM_SPACE_ID,
                        );
                        this.folderId = keyValues.find(
                            (keyValue) =>
                                keyValue.key ===
                                CLICKUP_TASK_PLATFORM_FOLDER_ID,
                        );
                        this.listId = keyValues.find(
                            (keyValue) =>
                                keyValue.key === CLICKUP_TASK_PLATFORM_LIST_ID,
                        );
                        this.webhookId = keyValues.find(
                            (keyValue) =>
                                keyValue.key ===
                                CLICKUP_TASK_PLATFORM_WEBHOOK_ID,
                        );
                        this.fg.patchValue({
                            apiKey: this.apiKey.value,
                            teamId: this.teamId.value,
                            spaceId: this.spaceId.value,
                            folderId: this.folderId.value,
                            listId: this.listId.value,
                            webhookId: this.webhookId.value,
                        });
                    });
                break;

            case 'support::config.detail.update':
                try {
                    await lastValueFrom(
                        this.keyValueService.insert({
                            objects: [
                                {
                                    id: this.apiKey.id,
                                    value: this.fg.value.apiKey,
                                    key: this.apiKey.key,
                                    type: this.apiKey.type,
                                    isActive: this.apiKey.isActive,
                                    isCached: this.apiKey.isCached,
                                },
                                {
                                    id: this.teamId.id,
                                    value: this.fg.value.teamId,
                                    key: this.teamId.key,
                                    type: this.teamId.type,
                                    isActive: this.teamId.isActive,
                                    isCached: this.teamId.isCached,
                                },
                                {
                                    id: this.spaceId.id,
                                    value: this.fg.value.spaceId,
                                    key: this.spaceId.key,
                                    type: this.spaceId.type,
                                    isActive: this.spaceId.isActive,
                                    isCached: this.spaceId.isCached,
                                },
                                {
                                    id: this.folderId.id,
                                    value: this.fg.value.folderId,
                                    key: this.folderId.key,
                                    type: this.folderId.type,
                                    isActive: this.folderId.isActive,
                                    isCached: this.folderId.isCached,
                                },
                                {
                                    id: this.listId.id,
                                    value: this.fg.value.listId,
                                    key: this.listId.key,
                                    type: this.listId.type,
                                    isActive: this.listId.isActive,
                                    isCached: this.listId.isCached,
                                },
                            ],
                        }),
                    );

                    this.snackBar.open(
                        `${this.translocoService.translate('support.Config')} ${this.translocoService.translate('Saved.M')}`,
                        undefined,
                        {
                            verticalPosition: 'top',
                            duration: 3000,
                        },
                    );

                    //this.router.navigate(['support/config']);
                } catch (error) {
                    log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
                }
                break;
            /* #endregion common actions */

            /* #region custom actions */
            case 'support::config.detail.createWebhook':
                const webhook = await lastValueFrom(
                    this.issueService.createWebhookConfig(),
                );
                this.fg.get('webhookId').setValue(webhook.externalId);
                break;

            case 'support::config.detail.deleteWebhook':
                await lastValueFrom(this.issueService.deleteWebhookConfig());
                this.fg.get('webhookId').setValue('');
                break;
            /* #endregion custom actions */
        }
    }
}
