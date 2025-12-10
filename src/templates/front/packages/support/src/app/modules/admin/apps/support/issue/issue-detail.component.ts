import { UpperCasePipe } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    signal,
    ViewEncapsulation,
    WritableSignal,
} from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { RecordingPreviewDialogComponent } from '@apps/screen-recording';
import { SupportComment, SupportIssue } from '@apps/support';
import { CommentService } from '@apps/support/comment';
import { IssueService } from '@apps/support/issue';
import {
    Action,
    ChipComponent,
    Crumb,
    DateFormatPipe,
    defaultDetailImports,
    EnvironmentsInformation,
    EnvironmentsInformationService,
    IamService,
    log,
    mapActions,
    SnackBarInvalidFormComponent,
    uuid,
    ViewDetailComponent,
} from '@aurora';
import { firstValueFrom, lastValueFrom, takeUntil } from 'rxjs';

@Component({
    selector: 'support-issue-detail',
    templateUrl: './issue-detail.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ...defaultDetailImports,
        ChipComponent,
        DateFormatPipe,
        UpperCasePipe,
    ],
})
export class IssueDetailComponent extends ViewDetailComponent {
    // ---- customizations ----
    commentFg: FormGroup;
    comments: WritableSignal<SupportComment[]> = signal([]);
    isNewComment: boolean = false;

    // Object retrieved from the database request,
    // it should only be used to obtain uninitialized
    // data in the form, such as relations, etc.
    // It should not be used habitually, since the source of truth is the form.
    managedObject: WritableSignal<SupportIssue> = signal(null);

    // breadcrumb component definition
    breadcrumb: Crumb[] = [
        { translation: 'App' },
        { translation: 'support.Issues', routerLink: ['/support/issue'] },
        { translation: 'support.Issue' },
    ];

    constructor(
        private readonly issueService: IssueService,
        private readonly commentService: CommentService,
        private readonly environmentsInformationService: EnvironmentsInformationService,
        private readonly dialog: MatDialog,
        public readonly iamService: IamService,
    ) {
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
                'support::issue.detail.new': 'support::issue.detail.create',
                'support::issue.detail.edit': 'support::issue.detail.update',
            }),
            isViewAction: false,
        });
    }

    onSubmitComment($event): void {
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
        if (this.commentFg.invalid) {
            log('[DEBUG] Error to validate form: ', this.commentFg);
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
            id: mapActions(this.currentAction.id, {
                'support::issue.detail.newComment':
                    'support::issue.detail.createComment',
                'support::issue.detail.editComment':
                    'support::issue.detail.updateComment',
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
            externalId: ['', [Validators.maxLength(64)]],
            externalStatus: ['', [Validators.maxLength(36)]],
            externalColorStatus: ['', [Validators.maxLength(16)]],
            accountId: [
                null,
                [Validators.minLength(36), Validators.maxLength(36)],
            ],
            accountUsername: ['', [Validators.maxLength(128)]],
            displayName: ['', [Validators.maxLength(128)]],
            frontEnvironment: ['', [Validators.maxLength(36)]],
            frontVersion: ['', [Validators.maxLength(16)]],
            backEnvironment: ['', [Validators.maxLength(36)]],
            backVersion: ['', [Validators.maxLength(16)]],
            subject: ['', [Validators.required, Validators.maxLength(510)]],
            description: ['', [Validators.required]],
            attachments: null,
        });

        this.commentFg = this.fb.group({
            id: null,
            issueId: null,
            externalId: null,
            accountId: null,
            description: ['', [Validators.required]],
        });
        /* eslint-enable key-spacing */
    }

    async handleAction(action: Action): Promise<void> {
        // add optional chaining (?.) to avoid first call where behaviour subject is undefined
        switch (action?.id) {
            /* #region common actions */
            case 'support::issue.detail.new':
                this.fg.get('id').setValue(uuid());
                break;

            case 'support::issue.detail.edit':
                this.issueService.issue$
                    .pipe(takeUntil(this.unsubscribeAll$))
                    .subscribe((item) => {
                        this.managedObject.set(item);
                        this.fg.patchValue(item);
                        this.comments.set(item.comments || []);
                    });
                break;

            case 'support::issue.detail.create':
                try {
                    const environments: EnvironmentsInformation =
                        await firstValueFrom(
                            this.environmentsInformationService
                                .environmentsInformation$,
                        );

                    await lastValueFrom(
                        this.issueService.create<SupportIssue>({
                            object: {
                                ...this.fg.value,
                                frontVersion: environments.front.version,
                                frontEnvironment:
                                    environments.front.environment,
                                backVersion: environments.back.version,
                                backEnvironment: environments.back.environment,
                            },
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

                    this.router.navigate(['support/issue']);
                } catch (error) {
                    log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
                }
                break;

            case 'support::issue.detail.update':
                try {
                    await lastValueFrom(
                        this.issueService.updateById<SupportIssue>({
                            object: this.fg.value,
                        }),
                    );

                    this.snackBar.open(
                        `${this.translocoService.translate('support.Issue')} ${this.translocoService.translate('Saved.M')}`,
                        undefined,
                        {
                            verticalPosition: 'top',
                            duration: 3000,
                        },
                    );

                    this.router.navigate(['support/issue']);
                } catch (error) {
                    log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
                }
                break;
            /* #endregion common actions */

            /* #region comment actions */
            case 'support::issue.detail.newComment':
                if (this.commentFg.value?.id) return;

                const newComment = {
                    id: uuid(),
                    issueId: this.managedObject().id,
                    externalId: null,
                    description: '',
                };
                this.isNewComment = true;

                this.commentFg.patchValue(newComment);
                break;

            case 'support::issue.detail.createComment':
                try {
                    await lastValueFrom(
                        this.commentService.create<SupportComment>({
                            object: this.commentFg.value,
                        }),
                    );

                    const commentCreated = await lastValueFrom(
                        this.commentService.findById({
                            id: this.commentFg.value.id,
                        }),
                    );

                    // update comment in the list
                    this.comments.update((comments) => [
                        commentCreated.object,
                        ...comments,
                    ]);

                    this.isNewComment = false;
                    this.commentFg.reset();

                    this.snackBar.open(
                        `${this.translocoService.translate('support.Comment')} ${this.translocoService.translate('Created.M')}`,
                        undefined,
                        {
                            verticalPosition: 'top',
                            duration: 3000,
                        },
                    );
                } catch (error) {
                    log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
                }
                break;

            case 'support::issue.detail.editComment':
                for (const comment of this.comments()) {
                    if (comment.id === action.meta.comment.id) {
                        this.commentFg.patchValue(comment);
                        break;
                    }
                }
                break;

            case 'support::issue.detail.updateComment':
                try {
                    await lastValueFrom(
                        this.commentService.updateById<SupportComment>({
                            object: this.commentFg.value,
                        }),
                    );

                    // update comment in the list
                    this.comments.update((comments) => {
                        return comments.map((comment) => {
                            if (comment.id === this.commentFg.value.id) {
                                return {
                                    ...comment,
                                    ...this.commentFg.value,
                                };
                            }
                            return comment;
                        });
                    });
                    this.commentFg.reset();

                    this.snackBar.open(
                        `${this.translocoService.translate('support.Comment')} ${this.translocoService.translate('Saved.M')}`,
                        undefined,
                        {
                            verticalPosition: 'top',
                            duration: 3000,
                        },
                    );
                } catch (error) {
                    log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
                }
                break;

            case 'support::issue.detail.deleteComment':
                const confirmation = this.confirmationService.open({
                    title: `${this.translocoService.translate('Delete')} ${this.translocoService.translate('support.Comment')}`,
                    message: this.translocoService.translate(
                        'DeletionWarning',
                        {
                            entity: this.translocoService.translate(
                                'support.Comment',
                            ),
                        },
                    ),
                    icon: {
                        show: true,
                        name: 'heroicons_outline:exclamation-triangle',
                        color: 'warn',
                    },
                    actions: {
                        confirm: {
                            show: true,
                            label: this.translocoService.translate('Remove'),
                            color: 'warn',
                        },
                        cancel: {
                            show: true,
                            label: this.translocoService.translate('Cancel'),
                        },
                    },
                    dismissible: true,
                });

                confirmation.afterClosed().subscribe(async (result) => {
                    if (result === 'confirmed') {
                        try {
                            await lastValueFrom(
                                this.commentService.deleteById({
                                    id: action.meta.comment.id,
                                }),
                            );

                            // update comment in the list
                            this.comments.update((comments) => {
                                return comments.filter(
                                    (comment) =>
                                        comment.id !== action.meta.comment.id,
                                );
                            });
                            this.commentFg.reset();

                            this.snackBar.open(
                                `${this.translocoService.translate('support.Comment')} ${this.translocoService.translate('Deleted.M')}`,
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

            case 'support::issue.detail.cancelComment':
                // delete comment from the list if it is a new comment
                if (this.isNewComment) {
                    this.comments.update((comments) => {
                        return comments.filter(
                            (comment) =>
                                comment.id !== this.commentFg.value?.id,
                        );
                    });
                }
                this.commentFg.reset();
                this.isNewComment = false;
                break;
            /* #endregion comment actions */

            /* #region custom actions */
            case 'support::issue.detail.openPreviewVideoDialog':
                this.dialog.open(RecordingPreviewDialogComponent, {
                    data: {
                        videoUrl: this.managedObject().screenRecording.url,
                    },
                    width: '720px',
                    maxWidth: '90vw',
                });
                break;

            case 'support::issue.detail.openRecordingScreen':
                console.log('Open recording screen action');
                break;
            /* #endregion custom actions */
        }
    }
}
