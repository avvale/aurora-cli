import {
    ChangeDetectionStrategy,
    Component,
    DestroyRef,
    Inject,
    inject,
    signal,
    ViewEncapsulation,
    WritableSignal,
} from '@angular/core';
import { Validators } from '@angular/forms';
import {
    MAT_DIALOG_DATA,
    MatDialog,
    MatDialogModule,
    MatDialogRef,
} from '@angular/material/dialog';
import { RecordingPreviewDialogComponent } from '@apps/screen-recording';
import { SupportIssue } from '@apps/support';
import { IssueService } from '@apps/support/issue';
import {
    Action,
    defaultDetailImports,
    log,
    SnackBarInvalidFormComponent,
    StorageAccountFileManagerFileUploadedInput,
    uuid,
    ViewDetailComponent,
} from '@aurora';
import { lastValueFrom } from 'rxjs';

@Component({
    selector: 'support-issue-detail-dialog',
    templateUrl: './issue-detail-dialog.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [...defaultDetailImports, MatDialogModule],
})
export class IssueDetailDialogComponent extends ViewDetailComponent {
    // ---- customizations ----
    // ..

    // Object retrieved from the database request,
    // it should only be used to obtain uninitialized
    // data in the form, such as relations, etc.
    // It should not be used habitually, since the source of truth is the form.
    managedObject: WritableSignal<SupportIssue> = signal(null);

    screenRecordingVideoUrl = signal<string | null>(null);
    private previewDialogRef: MatDialogRef<RecordingPreviewDialogComponent> | null =
        null;
    private readonly destroyRef = inject(DestroyRef);

    constructor(
        private readonly issueService: IssueService,
        private readonly dialog: MatDialog,
        public readonly dialogRef: MatDialogRef<IssueDetailDialogComponent>,
        @Inject(MAT_DIALOG_DATA)
        public data: {
            screenRecording: StorageAccountFileManagerFileUploadedInput;
        },
    ) {
        super();
    }

    // this method will be called after the ngOnInit of
    // the parent class you can use instead of ngOnInit
    init(): void {
        this.fg.get('screenRecording')?.setValue(this.data.screenRecording);
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
            id: 'support::issue.detailDialog.create',
            isViewAction: false,
        });
    }

    createForm(): void {
        /* eslint-disable key-spacing */
        this.fg = this.fb.group({
            id: null,
            subject: ['', [Validators.required, Validators.maxLength(510)]],
            description: ['', [Validators.required]],
            attachments: null,
            screenRecording: null,
        });
        /* eslint-enable key-spacing */
    }

    async handleAction(action: Action): Promise<void> {
        // add optional chaining (?.) to avoid first call where behaviour subject is undefined
        switch (action?.id) {
            /* #region common actions */
            case 'support::issue.detailDialog.new':
                this.fg.get('id').setValue(uuid());
                break;

            case 'support::issue.detailDialog.create':
                try {
                    await lastValueFrom(
                        this.issueService.create<SupportIssue>({
                            object: this.fg.value,
                        }),
                    );

                    this.snackBar.open(
                        `${this.translocoService.translate('support.Issue')} ${this.translocoService.translate('Created.M')}`,
                        undefined,
                        {
                            verticalPosition: 'top',
                            duration: 3000,
                        },
                    );

                    this.dialogRef.close();

                    this.actionService.action({
                        id: 'support::issue.list.pagination',
                        isViewAction: false,
                    });
                } catch (error) {
                    log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
                }
                break;
            /* #endregion common actions */

            /* #region custom actions */
            case 'support::issue.detailDialog.openPreviewVideoDialog':
                this.screenRecordingVideoUrl.set(
                    URL.createObjectURL(this.data.screenRecording.file),
                );

                this.previewDialogRef = this.dialog.open(
                    RecordingPreviewDialogComponent,
                    {
                        data: { videoUrl: this.screenRecordingVideoUrl() },
                        width: '720px',
                        maxWidth: '90vw',
                    },
                );

                this.previewDialogRef.afterClosed().subscribe(() => {
                    this.previewDialogRef = null;
                    URL.revokeObjectURL(this.screenRecordingVideoUrl());
                });
                break;
            /* #endregion custom actions */
        }
    }
}
