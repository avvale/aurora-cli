
import { ChangeDetectionStrategy, Component, Injector, ViewEncapsulation } from '@angular/core';
import { Action, ColumnConfig, ColumnDataType, Crumb, GridData, ViewBaseComponent } from '@aurora';
import { combineLatest, map, Observable, of } from 'rxjs';
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
    gridTranslations$: Observable<any>;
    columnsConfig: ColumnConfig[] = [
        {
            type       : ColumnDataType.ACTIONS,
            field      : 'Actions',
            headerClass: 'w-32',
            sticky     : true,
            actions    : () =>
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
            type       : ColumnDataType.STRING,
            field      : 'code',
            sort       : 'code',
            translation: '',
        },
        {
            type       : ColumnDataType.STRING,
            field      : 'customCode',
            sort       : 'customCode',
            translation: 'CustomCode',
        },
        {
            type       : ColumnDataType.STRING,
            field      : 'latitude',
            sort       : 'latitude',
            translation: 'Latitude',
        },
        {
            type       : ColumnDataType.STRING,
            field      : 'longitude',
            sort       : 'longitude',
            translation: 'Longitude',
        },
        {
            type       : ColumnDataType.STRING,
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
        this.gridTranslations$ = combineLatest(
            {
                a: this.translocoService.selectTranslation(),
                b: this.translocoService.selectTranslation('kitchen-sink'),
            })
            .pipe(
                map(res => ({ ...res.a, ...res.b })),
            );
    }

    handleColumnsConfigChanged($event): void
    {
        //
    }

    onRunAction(action: Action): void
    {

        switch (action.id)
        {
            case 'pagination':
                this.dataEvent = { ...this.dataEvent, ...action.meta.query };
                break;

            case 'edit':
                break;

            case 'delete':
                break;
        }
    }
}
