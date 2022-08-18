import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Inject, Output, QueryList, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SelectionChange } from '@angular/cdk/collections';
import { Action } from '@aurora/aurora.types';
import { Observable } from 'rxjs';
import { ColumnConfig, GridColumnFilter, GridCustomHeaderTemplateDirective, GridData, GridState } from '../grid';
import { GridComponent } from '../grid/grid/grid.component';
import { GridCellValueTemplateDirective } from '../grid/directives/grid-cell-value-template.directive';

@Component({
    selector       : 'au-grid-dialog',
    templateUrl    : './grid-dialog.component.html',
    styleUrls      : ['grid-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridDialogComponent
{
    gridId: string = 'grid';
    set gridData(gridData: GridData)
    {
        this._gridData = gridData;
        this.changeDetection.markForCheck();
    }
    get gridData(): GridData
    {
        return this._gridData;
    }
    columnsConfig: ColumnConfig[];
    selectedRows = [];

    // view
    @ViewChild(GridComponent) gridComponent: GridComponent;

    // outputs
    @Output() action = new EventEmitter<Action>();
    @Output() columnFiltersChange = new EventEmitter<GridState>();
    @Output() columnsConfigChange = new EventEmitter<ColumnConfig[]>();
    @Output() dialogClose = new EventEmitter<void>();
    @Output() dialogOpen = new EventEmitter<void>();
    @Output() rowsSelectionChange = new EventEmitter<SelectionChange<any>>();
    @Output() stateChange = new EventEmitter<GridState>();

    private _gridData: GridData;

    constructor(
        public dialogRef: MatDialogRef<GridDialogComponent>,
        private changeDetection: ChangeDetectorRef,
        @Inject(MAT_DIALOG_DATA) public data: {
            activatedColumnFilters: GridColumnFilter[];
            columnsConfig: ColumnConfig[] | Observable<ColumnConfig[]>;
            gridCellValuesTemplate: QueryList<GridCellValueTemplateDirective>;
            gridCustomHeadersTemplate: QueryList<GridCustomHeaderTemplateDirective>;
            gridData: GridData | Observable<GridData>;
            gridId: string;
            originColumnsConfig: ColumnConfig[];
            selectedRows: any[];
            title: string;
        },
    )
    {
        // check if columns config is a observable
        if (data.columnsConfig instanceof Observable)
        {
            data.columnsConfig.subscribe(columnsConfig => this.columnsConfig = columnsConfig);
        }
        else
        {
            this.columnsConfig = data.columnsConfig;
        }

        // check if grid data is a observable
        if (data.gridData instanceof Observable)
        {
            data.gridData.subscribe(gridData => this.gridData = gridData);
        }
        else
        {
            this.gridData = data.gridData;
        }

        this.gridId = data.gridId || this.gridId;
    }
}
