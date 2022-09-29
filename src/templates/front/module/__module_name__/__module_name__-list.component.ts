import { ChangeDetectionStrategy, Component, Injector, ViewEncapsulation } from '@angular/core';
import { Action, ColumnConfig, ColumnDataType, Crumb, ExportGridState, exportRows, GridColumnsConfigStorageService, GridData, GridFiltersStorageService, GridState, log, QueryStatementHandler, ViewBaseComponent } from '@aurora';
import { lastValueFrom, Observable, takeUntil } from 'rxjs';
import { {{ schema.aggregateName }} } from '../{{ toKebabCase schema.boundedContextName }}.types';
import { {{ toPascalCase schema.moduleName }}Service } from './{{ toKebabCase schema.moduleName }}.service';

export const {{ toCamelCase schema.moduleName }}ColumnsConfig: ColumnConfig[] = [
    {{#each schema.properties.gridFields}}
    {{#if (allowProperty ../schema.moduleName this) }}
    {
        type : ColumnDataType.{{ getColumnDataType }},
        field: '{{ toCamelCase name }}',
        sort : '{{ toCamelCase name }}',
    },
    {{/if}}
    {{/each}}
];

@Component({
    selector       : '{{ toKebabCase schema.boundedContextName }}-{{ toKebabCase schema.moduleName }}-list',
    templateUrl    : './{{ toKebabCase schema.moduleName }}-list.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class {{ toPascalCase schema.moduleName }}ListComponent extends ViewBaseComponent
{
    // ---- customizations ----
    // ..

    breadcrumb: Crumb[] = [
        { translation: 'App', routerLink: ['/']},
        { translation: '{{ toCamelCase schema.boundedContextName }}.{{ toPascalCase schema.moduleNames }}' },
    ];
    gridId: string = '{{ toCamelCase schema.boundedContextName }}::{{ toCamelCase schema.moduleName }}.list.mainGridList';
    gridData$: Observable<GridData<{{ schema.aggregateName }}>>;
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
                        id         : '{{ toCamelCase schema.boundedContextName }}::{{ toCamelCase schema.moduleName }}.list.edit',
                        translation: 'edit',
                        icon       : 'mode_edit',
                    },
                    {
                        id         : '{{ toCamelCase schema.boundedContextName }}::{{ toCamelCase schema.moduleName }}.list.delete',
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
        ...{{ toCamelCase schema.moduleName }}ColumnsConfig,
    ];

    constructor(
        protected readonly injector: Injector,
        private readonly gridColumnsConfigStorageService: GridColumnsConfigStorageService,
        private readonly gridFiltersStorageService: GridFiltersStorageService,
        private readonly {{ toCamelCase schema.moduleName }}Service: {{ toPascalCase schema.moduleName }}Service,
    )
    {
        super(injector);
    }

    // this method will be called after the ngOnInit of
    // the parent class you can use instead of ngOnInit
    init(): void
    {
        this.columnsConfig$ = this.gridColumnsConfigStorageService
            .getColumnsConfig(this.gridId, this.originColumnsConfig)
            .pipe(takeUntil(this.unsubscribeAll$));

        this.gridState = this.gridFiltersStorageService.getColumnFilterState(this.gridId);

        this.gridData$ = this.{{ toCamelCase schema.moduleName }}Service.pagination$;
    }

    handleStateChange($event): void
    {
        this.actionService.action({
            id          : '{{ toCamelCase schema.boundedContextName }}::{{ toCamelCase schema.moduleName }}.list.pagination',
            isViewAction: false,
            data        : {
                event: QueryStatementHandler
                    .fromGridStateBuilder($event)
                    .setDefaultOrder()
                    .getQueryStatement(),
            },
        });
    }

    handleColumnFiltersChange($event): void
    {
        this.gridFiltersStorageService.setColumnFilterState(this.gridId, $event);
    }

    handleColumnsConfigChange($event: ColumnConfig[]): void
    {
        this.gridColumnsConfigStorageService.setColumnsConfig(this.gridId, $event, this.originColumnsConfig);
    }

    handleGridAction(action: Action): void
    {
        this.actionService.action(action);
    }

    async handleExportData($event: ExportGridState): Promise<void>
    {
        const rows = await lastValueFrom(
            this.{{ toCamelCase schema.moduleName }}Service.get({
                query: QueryStatementHandler
                    .fromGridStateBuilder($event.gridState)
                    .setDefaultOrder()
                    .getQueryStatement(),
            }),
        );

        const columns: string[] = {{ toCamelCase schema.moduleName }}ColumnsConfig.map({{ toCamelCase schema.moduleName }}ColumnConfig => {{ toCamelCase schema.moduleName }}ColumnConfig.field);
        const headers = columns.map(column => this.translocoService.translate('{{ toKebabCase schema.boundedContextName }}.' + column.toPascalCase()));

        exportRows(
            rows.objects,
            '{{ toCamelCase schema.moduleNames }}.' + $event.format,
            columns,
            headers,
            $event.format,
        );
    }

    async handleAction(action: Action): Promise<void>
    {
        // add optional chaining (?.) to avoid first call where behaviour subject is undefined
        switch (action?.id)
        {
            case '{{ toCamelCase schema.boundedContextName }}::{{ toCamelCase schema.moduleName }}.list.pagination':
                await lastValueFrom(this.{{ toCamelCase schema.moduleName }}Service.pagination({ query: action.data.event }));
                break;

            case '{{ toCamelCase schema.boundedContextName }}::{{ toCamelCase schema.moduleName }}.list.edit':
                this.router.navigate(['{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/edit', action.data.row.id]);
                break;

            case '{{ toCamelCase schema.boundedContextName }}::{{ toCamelCase schema.moduleName }}.list.delete':
                const dialogRef = this.confirmationService.open({
                    title  : `${this.translocoService.translate('Delete')} ${this.translocoService.translate('{{ toCamelCase schema.boundedContextName }}.{{ toPascalCase schema.moduleName }}')}`,
                    message: this.translocoService.translate('DeletionWarning', { entity: this.translocoService.translate('{{ toCamelCase schema.boundedContextName }}.{{ toPascalCase schema.moduleName }}') }),
                    icon   : {
                        show : true,
                        name : 'heroicons_outline:exclamation',
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

                dialogRef.afterClosed()
                    .subscribe(async result =>
                    {
                        if (result === 'confirmed')
                        {
                            try
                            {
                                await lastValueFrom(
                                    this.{{ toCamelCase schema.moduleName }}Service
                                        .deleteById<{{ schema.aggregateName }}>(action.data.row.id),
                                );
                                this.actionService.action({ id: '{{ toCamelCase schema.boundedContextName }}::{{ toCamelCase schema.moduleName }}.list.pagination' });
                            }
                            catch(error)
                            {
                                log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
                            }
                        }
                    });
                break;
        }
    }
}
