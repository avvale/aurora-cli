import { UpperCasePipe } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    ViewEncapsulation,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
    RecordingService,
    ScreenRecordingResponse,
} from '@apps/screen-recording';
import { SupportIssue } from '@apps/support';
import { issueColumnsConfig, IssueService } from '@apps/support/issue';
import {
    Action,
    ChipComponent,
    ColumnConfig,
    ColumnDataType,
    Crumb,
    defaultListImports,
    exportRows,
    GridColumnsConfigStorageService,
    GridData,
    GridFiltersStorageService,
    GridState,
    GridStateService,
    log,
    queryStatementHandler,
    uuid,
    ViewBaseComponent,
} from '@aurora';
import { lastValueFrom, Observable, takeUntil } from 'rxjs';
import { IssueDetailDialogComponent } from './issue-detail-dialog.component';

export const issueMainGridListId = 'support::issue.list.mainGridList';

@Component({
    selector: 'support-issue-list',
    templateUrl: './issue-list.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [...defaultListImports, ChipComponent, UpperCasePipe],
})
export class IssueListComponent extends ViewBaseComponent {
    // ---- customizations ----
    // ..

    breadcrumb: Crumb[] = [
        { translation: 'App', routerLink: ['/'] },
        { translation: 'support.Issues' },
    ];
    gridId: string = issueMainGridListId;
    gridData$: Observable<GridData<SupportIssue>>;
    gridState: GridState = {};
    columnsConfig$: Observable<ColumnConfig[]>;
    originColumnsConfig: ColumnConfig[] = [
        {
            type: ColumnDataType.ACTIONS,
            field: 'Actions',
            sticky: true,
            actions: (row) => {
                return [
                    {
                        id: 'support::issue.list.edit',
                        translation: 'edit',
                        icon: 'mode_edit',
                    },
                    {
                        id: 'support::issue.list.delete',
                        translation: 'delete',
                        icon: 'delete',
                    },
                ];
            },
        },
        {
            type: ColumnDataType.CHECKBOX,
            field: 'select',
            translation: 'Selects',
            sticky: true,
        },
        ...issueColumnsConfig({ translator: this.translocoService }),
    ];

    constructor(
        private readonly gridColumnsConfigStorageService: GridColumnsConfigStorageService,
        private readonly gridFiltersStorageService: GridFiltersStorageService,
        private readonly gridStateService: GridStateService,
        private readonly issueService: IssueService,
        private readonly recordingService: RecordingService,
        private readonly dialog: MatDialog,
    ) {
        super();
    }

    // this method will be called after the ngOnInit of
    // the parent class you can use instead of ngOnInit
    init(): void {
        /**/
    }

    async handleAction(action: Action): Promise<void> {
        // add optional chaining (?.) to avoid first call where behaviour subject is undefined
        switch (action?.id) {
            /* #region common actions */
            case 'support::issue.list.view':
                this.columnsConfig$ = this.gridColumnsConfigStorageService
                    .getColumnsConfig(this.gridId, this.originColumnsConfig)
                    .pipe(takeUntil(this.unsubscribeAll$));

                this.gridState = {
                    columnFilters:
                        this.gridFiltersStorageService.getColumnFilterState(
                            this.gridId,
                        ),
                    page: this.gridStateService.getPage(this.gridId),
                    sort: this.gridStateService.getSort(this.gridId),
                    search: this.gridStateService.getSearchState(this.gridId),
                };

                this.gridData$ = this.issueService.pagination$;
                break;

            case 'support::issue.list.pagination':
                await lastValueFrom(
                    this.issueService.pagination({
                        query: action.meta.query
                            ? action.meta.query
                            : queryStatementHandler({
                                  columnsConfig: issueColumnsConfig(),
                              })
                                  .setColumFilters(
                                      this.gridFiltersStorageService.getColumnFilterState(
                                          this.gridId,
                                      ),
                                  )
                                  .setSort(
                                      this.gridStateService.getSort(
                                          this.gridId,
                                      ),
                                  )
                                  .setPage(
                                      this.gridStateService.getPage(
                                          this.gridId,
                                      ),
                                  )
                                  .setSearch(
                                      this.gridStateService.getSearchState(
                                          this.gridId,
                                      ),
                                  )
                                  .getQueryStatement(),
                    }),
                );
                break;

            case 'support::issue.list.edit':
                this.router.navigate([
                    'support/issue/edit',
                    action.meta.row.id,
                ]);
                break;

            case 'support::issue.list.delete':
                const deleteDialogRef = this.confirmationService.open({
                    title: `${this.translocoService.translate('Delete')} ${this.translocoService.translate('support.Issue')}`,
                    message: this.translocoService.translate(
                        'DeletionWarning',
                        {
                            entity: this.translocoService.translate(
                                'support.Issue',
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

                deleteDialogRef.afterClosed().subscribe(async (result) => {
                    if (result === 'confirmed') {
                        try {
                            await lastValueFrom(
                                this.issueService.deleteById<SupportIssue>({
                                    id: action.meta.row.id,
                                }),
                            );

                            this.actionService.action({
                                id: 'support::issue.list.pagination',
                                isViewAction: false,
                            });
                        } catch (error) {
                            log(
                                `[DEBUG] Catch error in ${action.id} action: ${error}`,
                            );
                        }
                    }
                });
                break;

            case 'support::issue.list.export':
                const rows = await lastValueFrom(
                    this.issueService.get({
                        query: action.meta.query,
                    }),
                );

                const columns: string[] = issueColumnsConfig().map(
                    (issueColumnConfig) => issueColumnConfig.field,
                );
                const headers: string[] = issueColumnsConfig().map(
                    (issueColumnConfig) =>
                        this.translocoService.translate(
                            issueColumnConfig.translation,
                        ),
                );

                exportRows(
                    rows.objects,
                    'issues.' + action.meta.format,
                    columns,
                    headers,
                    action.meta.format,
                );
                break;
            /* #endregion common actions */

            /* #region custom actions */
            case 'support::issue.list.openRecordingScreen':
                const observable = this.recordingService
                    .openConfigRecordingSnackbar()
                    .subscribe((res: ScreenRecordingResponse) => {
                        if (res.state === 'idle') observable.unsubscribe();

                        this.actionService.action({
                            id: 'support::issue.detailDialog.new',
                            isViewAction: true,
                        });

                        this.dialog.open(IssueDetailDialogComponent, {
                            width: '720px',
                            maxWidth: '90vw',
                            data: {
                                screenRecording: {
                                    id: uuid(),
                                    file: res.file,
                                    relativePathSegments: [
                                        'aurora',
                                        'screen-recording',
                                    ],
                                },
                            },
                        });
                    });
                break;
            /* #endregion custom actions */
        }
    }
}
