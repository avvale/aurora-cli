
import { ChangeDetectionStrategy, Component, Injector, ViewEncapsulation } from '@angular/core';
import { Action, ColumnConfig, ColumnDataType, Crumb, GridColumnFilter, GridData, Operator, setQueryFilters, ViewBaseComponent } from '@aurora';
import { Observable, of } from 'rxjs';
import { gridData } from './grid-data';

@Component({
    selector       : 'kitchen-sink-grid',
    templateUrl    : './grid.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridComponent extends ViewBaseComponent
{
    breadcrumb: Crumb[] = [
        { translation: 'App', routerLink: ['/']},
        { translation: 'kitchenSink.Grid' },
    ];
    gridData$: Observable<GridData<any>>;
    columnsConfig: ColumnConfig[] = [
        {
            type   : ColumnDataType.ACTIONS,
            field  : 'actions',
            sticky : true,
            actions: () =>
            {
                return [
                    {
                        id         : 'edit',
                        icon       : 'mode_edit',
                        translation: 'Edit',
                    },
                    {
                        id         : 'delete',
                        icon       : 'delete',
                        translation: 'Delete',
                    },
                ];
            },
            hidden: false,
        },
        {
            type  : ColumnDataType.CHECKBOX,
            field : 'select',
            sticky: true,
            hidden: false,
        },
        {
            type       : ColumnDataType.STRING,
            field      : 'code',
            headerClass: 'w-32',
            sort       : 'code',
            translation: 'Code',
            transform  : data => data + ' (data transformed with colum config)',
        },
        {
            type       : ColumnDataType.STRING,
            field      : 'customCode',
            sort       : 'customCode',
            translation: 'CustomCode',
        },
        {
            type       : ColumnDataType.DATE,
            field      : 'createdAt',
            sort       : 'createdAt',
            translation: 'CreatedAt',
        },
        {
            type       : ColumnDataType.NUMBER,
            field      : 'latitude',
            sort       : 'latitude',
            translation: 'Latitude',
        },
        {
            type       : ColumnDataType.NUMBER,
            field      : 'longitude',
            sort       : 'longitude',
            translation: 'Longitude',
        },
        {
            type       : ColumnDataType.NUMBER,
            field      : 'zoom',
            sort       : 'zoom',
            translation: 'Zoom',
        },
        {
            type       : ColumnDataType.STRING,
            field      : 'name',
            sort       : 'name',
            translation: 'Name',
        },
        {
            type       : ColumnDataType.STRING,
            field      : 'slug',
            sort       : 'slug',
            translation: 'Slug',
        },
    ];

    dataEvent: any = undefined;
    defaultFilters: GridColumnFilter[] = [
        {
            id      : '1bf1fce9-8d4d-400c-a4ac-a87d5ef1fbbc',
            field   : 'code',
            type    : ColumnDataType.STRING,
            operator: Operator.substring,
            value   : 'hola mundo',
        },
    ];

    constructor(
        protected injector: Injector,
    )
    {
        super(injector);
    }

    ngOnInit(): void
    {
        /**/
        this.gridData$ = of(gridData);
    }

    handleColumnsConfigChange($event): void
    {
        console.log($event);
    }

    handleRowsSelectionChange($event): void
    {
        console.log($event);
    }

    handleFiltersChange($event): void
    {
        console.log($event);
    }

    handlePageChange($event): void
    {
        console.log($event);
    }

    handleStateChange($event): void
    {
        this.onRunAction({ id: 'pagination', data: { event: setQueryFilters($event) }});
    }

    onRunAction(action: Action): void
    {
        this.currentAction = action;

        switch (action?.id)
        {
            case 'pagination':
                this.dataEvent = { ...this.dataEvent, ...action.data.event };
                break;

            case 'edit':
                break;

            case 'delete':
                break;
        }
    }
}
