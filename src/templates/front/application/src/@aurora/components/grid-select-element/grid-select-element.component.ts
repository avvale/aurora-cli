import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SelectionChange } from '@angular/cdk/collections';
import { Action } from '@aurora/aurora.types';
import { ColumnConfig, GridColumnFilter, GridData, GridState } from '../grid';
import { GridDialogComponent } from '../grid-dialog/grid-dialog.component';

@Component({
    selector       : 'au-grid-select-element',
    template       : '',
    styleUrls      : ['./grid-select-element.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridSelectElementComponent
{
    @Input() dialogTitle: string;
    @Input() activatedColumnFilters: GridColumnFilter[];
    @Input() columnsConfig: ColumnConfig[];
    @Input() originColumnsConfig: ColumnConfig[];
    @Input() selectedRows: any[] = [];
    private _data: GridData;
    @Input() set data(gridData: GridData)
    {
        this._data = gridData;
        if (this.elementDialogRef)
        {
            this.elementDialogRef.componentInstance.gridData = gridData;
            this.changeDetection.markForCheck();
        }
    }
    get data(): GridData
    {
        return this._data;
    }

    @Output() action = new EventEmitter<Action>();
    @Output() columnFiltersChange = new EventEmitter<GridState>();
    @Output() columnsConfigChange = new EventEmitter<ColumnConfig[]>();
    @Output() rowsSelectionChange = new EventEmitter<SelectionChange<any>>();
    @Output() stateChange = new EventEmitter<GridState>();

    elementDialogRef: MatDialogRef<GridDialogComponent>;

    constructor(
        private changeDetection: ChangeDetectorRef,
        private dialog: MatDialog,
    ) { }

    openDialog(): void
    {
        this.elementDialogRef = this.dialog.open(GridDialogComponent,
            {
                width    : '90vw',
                maxWidth : '1024px',
                minWidth : '240px',
                autoFocus: false,
                data     : {
                    activatedColumnFilters: this.activatedColumnFilters,
                    columnsConfig         : this.columnsConfig,
                    gridData              : this.data,           // pass data when create dialog, after, will be passed by @Input() set data property
                    originColumnsConfig   : this.originColumnsConfig,
                    selectedRows          : this.selectedRows,
                    title                 : this.dialogTitle,
                },
            });

        // pass change state event to parent component
        this.elementDialogRef
            .componentInstance
            .stateChange
            .subscribe((state: GridState) => this.stateChange.next(state));

        // pass change filters event to parent component
        this.elementDialogRef
            .componentInstance
            .columnFiltersChange
            .subscribe((state: GridState) => this.columnFiltersChange.next(state));

        // pass on columns config change event to parent component
        this.elementDialogRef
            .componentInstance
            .columnsConfigChange
            .subscribe((columnConfig: ColumnConfig[]) => this.columnsConfigChange.next(columnConfig));

        // pass action click event to parent component
        this.elementDialogRef
            .componentInstance
            .action
            .subscribe((action: Action) => this.action.next(action));

        // pass on selection row event to parent component
        this.elementDialogRef
            .componentInstance
            .rowsSelectionChange
            .subscribe((action: Action) => this.action.next(action));
    }

    closeDialog(): void
    {
        this.elementDialogRef.close();
    }
}
