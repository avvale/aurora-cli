import { OAuthRefreshToken } from '../o-auth.types';
import { refreshTokenColumnsConfig } from './refresh-token.columns-config';
import { RefreshTokenService } from './refresh-token.service';
import { ChangeDetectionStrategy, Component, Injector, ViewEncapsulation } from '@angular/core';
import { Action, ColumnConfig, ColumnDataType, Crumb, defaultListImports, exportRows, GridColumnsConfigStorageService, GridData, GridFiltersStorageService, GridState, GridStateService, log, QueryStatementHandler, ViewBaseComponent } from '@aurora';
import { lastValueFrom, Observable, takeUntil } from 'rxjs';

@Component({
    selector       : 'o-auth-refresh-token-list',
    templateUrl    : './refresh-token-list.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone     : true,
    imports        : [
        ...defaultListImports,
    ],
})
export class RefreshTokenListComponent extends ViewBaseComponent
{
    // ---- customizations ----
    // ..

    breadcrumb: Crumb[] = [
        { translation: 'App', routerLink: ['/']},
        { translation: 'oAuth.RefreshTokens' },
    ];
    gridId: string = 'oAuth::refreshToken.list.mainGridList';
    gridData$: Observable<GridData<OAuthRefreshToken>>;
    gridState: GridState = {};
    columnsConfig$: Observable<ColumnConfig[]>;
    originColumnsConfig: ColumnConfig[] = [
        {
            type   : ColumnDataType.ACTIONS,
            field  : 'Actions',
            sticky : true,
            actions: row =>
            {
                return [
                    {
                        id         : 'oAuth::refreshToken.list.edit',
                        translation: 'edit',
                        icon       : 'mode_edit',
                    },
                    {
                        id         : 'oAuth::refreshToken.list.delete',
                        translation: 'delete',
                        icon       : 'delete',
                    },
                ];
            },
        },
        {
            type       : ColumnDataType.CHECKBOX,
            field      : 'select',
            translation: 'Selects',
            sticky     : true,
        },
        ...refreshTokenColumnsConfig,
    ];

    constructor(
        protected readonly injector: Injector,
        private readonly gridColumnsConfigStorageService: GridColumnsConfigStorageService,
        private readonly gridFiltersStorageService: GridFiltersStorageService,
        private readonly gridStateService: GridStateService,
        private readonly refreshTokenService: RefreshTokenService,
    )
    {
        super(injector);
    }

    // this method will be called after the ngOnInit of
    // the parent class you can use instead of ngOnInit
    init(): void
    { /**/ }

    async handleAction(action: Action): Promise<void>
    {
        // add optional chaining (?.) to avoid first call where behaviour subject is undefined
        switch (action?.id)
        {
            case 'oAuth::refreshToken.list.view':
                this.columnsConfig$ = this.gridColumnsConfigStorageService
                    .getColumnsConfig(this.gridId, this.originColumnsConfig)
                    .pipe(takeUntil(this.unsubscribeAll$));

                this.gridState = {
                    columnFilters: this.gridFiltersStorageService.getColumnFilterState(this.gridId),
                    page         : this.gridStateService.getPage(this.gridId),
                    sort         : this.gridStateService.getSort(this.gridId),
                    search       : this.gridStateService.getSearchState(this.gridId),
                };

                this.gridData$ = this.refreshTokenService.pagination$;
                break;

            case 'oAuth::refreshToken.list.pagination':
                await lastValueFrom(
                    this.refreshTokenService.pagination({
                        query: action.meta.query ?
                            action.meta.query :
                            QueryStatementHandler
                                .init({ columnsConfig: refreshTokenColumnsConfig })
                                .setColumFilters(this.gridFiltersStorageService.getColumnFilterState(this.gridId))
                                .setSort(this.gridStateService.getSort(this.gridId))
                                .setPage(this.gridStateService.getPage(this.gridId))
                                .setSearch(this.gridStateService.getSearchState(this.gridId))
                                .getQueryStatement(),
                    }),
                );
                break;

            case 'oAuth::refreshToken.list.edit':
                this.router
                    .navigate([
                        'o-auth/refresh-token/edit',
                        action.meta.row.id,
                    ]);
                break;

            case 'oAuth::refreshToken.list.delete':
                const deleteDialogRef = this.confirmationService.open({
                    title  : `${this.translocoService.translate('Delete')} ${this.translocoService.translate('oAuth.RefreshToken')}`,
                    message: this.translocoService.translate('DeletionWarning', { entity: this.translocoService.translate('oAuth.RefreshToken') }),
                    icon   : {
                        show : true,
                        name : 'heroicons_outline:exclamation-triangle',
                        color: 'warn',
                    },
                    actions: {
                        confirm: {
                            show : true,
                            label: this.translocoService.translate('Remove'),
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
                                    this.refreshTokenService
                                        .deleteById<OAuthRefreshToken>({
                                            id: action.meta.row.id,
                                        }),
                                );

                                this.actionService.action({
                                    id          : 'oAuth::refreshToken.list.pagination',
                                    isViewAction: false,
                                });
                            }
                            catch(error)
                            {
                                log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
                            }
                        }
                    });
                break;

            case 'oAuth::refreshToken.list.export':
                const rows = await lastValueFrom(
                    this.refreshTokenService
                        .get({
                            query: action.meta.query,
                        }),
                );

                // format export rows
                (rows.objects as any[]).forEach(row =>
                {
                    // row.id = row.id;
                });

                const columns: string[] = refreshTokenColumnsConfig.map(refreshTokenColumnConfig => refreshTokenColumnConfig.field);
                const headers: string[] = columns.map(column => this.translocoService.translate('oAuth.' + column.toPascalCase()));

                exportRows(
                    rows.objects,
                    'refreshTokens.' + action.meta.format,
                    columns,
                    headers,
                    action.meta.format,
                );
                break;
        }
    }
}
