import { SelectionChange } from '@angular/cdk/collections';
import { ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, Input, Output, QueryList } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Action } from '@aurora';
import { GridComponent } from '@aurora/components/grid/grid/grid.component';
import { ColumnConfig, GridData, GridState } from '../grid';
import { GridDialogComponent } from '../grid-dialog/grid-dialog.component';
import { GridSelectElementCellValueTemplateDirective } from './directives/grid-select-element-cell-value-template.directive';
import { GridSelectElementCustomHeaderTemplateDirective } from './directives/grid-select-element-custom-header-template.directive';

@Component({
    selector       : 'au-grid-select-element',
    template       : '',
    styleUrls      : ['./grid-select-element.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone     : true,
    imports        : [GridComponent],
})
export class GridSelectElementComponent
{
    @Input() id: string = 'grid';
    @Input() dialogTitle: string;
    @Input() gridState: GridState;
    @Input() columnsConfig: ColumnConfig[];
    @Input() originColumnsConfig: ColumnConfig[];
    @Input() selectedRows: any[] = [];

    // manage gridData
    private _gridData: GridData;
    @Input() set gridData(gridData: GridData)
    {
        // save gridData firs input to be used in the dialog when open dialog
        this._gridData = gridData;

        // after open dialog, when componentInstance is defined, set gridData
        // to the dialog
        this.elementDialogRef?.componentInstance
            .gridDataSubject$.next(gridData);
    }
    get gridData(): GridData
    {
        return this._gridData;
    }

    @Output() action = new EventEmitter<Action>();
    @Output() columnFiltersChange = new EventEmitter<GridState>();
    @Output() columnsConfigChange = new EventEmitter<ColumnConfig[]>();
    @Output() selectedCheckboxRowModelChange = new EventEmitter<SelectionChange<any>>();
    @Output() search = new EventEmitter<GridState>();
    @Output() stateChange = new EventEmitter<GridState>();

    // directive to set custom values in cells
    @ContentChildren(GridSelectElementCellValueTemplateDirective) gridSelectElementCellValuesTemplate?: QueryList<GridSelectElementCellValueTemplateDirective>;

    // add custom header
    @ContentChildren(GridSelectElementCustomHeaderTemplateDirective) gridSelectElementCustomHeadersTemplate?: QueryList<GridSelectElementCustomHeaderTemplateDirective>;

    elementDialogRef: MatDialogRef<GridDialogComponent>;

    constructor(
        private dialog: MatDialog,
    ) { }

    openDialog(): void
    {
        this.elementDialogRef = this.dialog.open(GridDialogComponent,
            {
                panelClass: 'au-dialog',
                width     : '90vw',
                maxWidth  : '1024px',
                minWidth  : '240px',
                autoFocus : false,
                data      : {
                    gridId                   : this.id,
                    gridState                : this.gridState,
                    columnsConfig            : this.columnsConfig,
                    gridCellValuesTemplate   : this.gridSelectElementCellValuesTemplate,
                    gridCustomHeadersTemplate: this.gridSelectElementCustomHeadersTemplate,
                    originColumnsConfig      : this.originColumnsConfig,
                    selectedRows             : this.selectedRows,
                    title                    : this.dialogTitle,
                },
            });

        // set gridData saved when component is created
        this.elementDialogRef
            .componentInstance
            .gridDataSubject$.next(this.gridData);

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

        // pass search event to parent component
        this.elementDialogRef
            .componentInstance
            .search
            .subscribe((state: GridState) => this.search.next(state));

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
            .selectedCheckboxRowModelChange
            .subscribe((action: Action) => this.action.next(action));
    }

    closeDialog(): void
    {
        this.elementDialogRef.close();
    }
}
