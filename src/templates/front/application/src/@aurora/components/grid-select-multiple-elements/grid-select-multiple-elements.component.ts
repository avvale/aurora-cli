import { SelectionChange } from '@angular/cdk/collections';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { NgForOf, NgIf, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChild, ContentChildren, EventEmitter, Input, Output, QueryList } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Action } from '@aurora';
import { GridCustomHeaderTemplateDirective } from '@aurora/components/grid/directives/grid-custom-header-template.directive';
import { GridDialogComponent } from '../grid-dialog/grid-dialog.component';
import { ColumnConfig, GridData, GridState } from '../grid/grid.types';
import { GridComponent } from '../grid/grid/grid.component';
import { SelectionModel } from '../grid/selection-model/selection-model';
import { GridSelectMultipleCellValueDialogTemplateDirective } from './directives/grid-select-multiple-cell-value-dialog-template.directive';
import { GridSelectMultipleCellValueTemplateDirective } from './directives/grid-select-multiple-cell-value-template.directive';
import { GridSelectMultipleCustomHeaderDialogTemplateDirective } from './directives/grid-select-multiple-custom-header-dialog-template.directive';
import { GridSelectMultipleCustomHeaderTemplateDirective } from './directives/grid-select-multiple-custom-header-template.directive';

@Component({
    selector       : 'au-grid-select-multiple-elements',
    templateUrl    : './grid-select-multiple-elements.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone     : true,
    imports        : [
        GridComponent, GridCustomHeaderTemplateDirective, MatIconModule, NgForOf, NgIf, NgTemplateOutlet,
    ],
})
export class GridSelectMultipleElementsComponent
{
    elementsDialogRef: MatDialogRef<GridDialogComponent>;

    // component label
    @Input() label: string;

    // grid dialog
    @Input() dialogGridId: string = 'dialogGrid';
    @Input() dialogTitle: string;
    @Input() dialogColumnsConfig: ColumnConfig[];
    @Input() dialogOriginColumnsConfig: ColumnConfig[];
    @Input() dialogGridState: GridState;
    @Input() dialogSelectedRows: any[] = [];

    // manage dialog gridData
    private _dialogGridData: GridData;
    @Input() set dialogGridData(dialogGridData: GridData)
    {
        // save gridData firs input to be used in the dialog when open dialog
        this._dialogGridData = dialogGridData;

        // after open dialog, when componentInstance is defined, set gridData
        // to the dialog
        this.elementsDialogRef?.componentInstance?.gridDataSubject$.next(dialogGridData);
    }
    get dialogGridData(): GridData
    {
        return this._dialogGridData;
    }

    // grid
    @Input() gridState: GridState;
    @Input() gridData: GridData;
    @Input() gridId: string = 'grid';
    @Input() columnsConfig: ColumnConfig[];
    @Input() originColumnsConfig: ColumnConfig[];
    @Input() hasPagination: boolean = true;
    @Input() hasDragAndDrop: boolean = false;
    @Input() hasFilterButton: boolean = true;
    @Input() hasSearch: boolean = true;
    @Input() selectedCheckboxRowModel = new SelectionModel<any>(true, [], true, (a: any, b: any) => a.id === b.id);

    // selected items grid inputs
    @Input() selectedItemsColumnsConfig: ColumnConfig[];
    @Input() selectedItemsData: GridData;

    // add custom buttons header
    @ContentChild(GridSelectMultipleCustomHeaderTemplateDirective) gridSelectMultipleCustomHeadersTemplate?: GridSelectMultipleCustomHeaderTemplateDirective;
    @ContentChildren(GridSelectMultipleCustomHeaderDialogTemplateDirective) gridSelectMultipleCustomHeadersDialogTemplate?: QueryList<GridSelectMultipleCustomHeaderDialogTemplateDirective>;

    // directive to set custom values in cells
    @ContentChildren(GridSelectMultipleCellValueTemplateDirective) gridSelectMultipleCellValuesTemplate?: QueryList<GridSelectMultipleCellValueTemplateDirective>;
    @ContentChildren(GridSelectMultipleCellValueDialogTemplateDirective) gridSelectMultipleCellValuesDialogTemplate?: QueryList<GridSelectMultipleCellValueDialogTemplateDirective>;

    // outputs
    @Output() action = new EventEmitter<Action>();
    @Output() columnsConfigChange = new EventEmitter<ColumnConfig[]>();
    @Output() rowDrop = new EventEmitter<CdkDragDrop<any>>();
    @Output() selectedCheckboxRowModelChange = new EventEmitter<SelectionChange<any>>();
    @Output() stateChange = new EventEmitter<GridState>();
    @Output() search = new EventEmitter<GridState>();
    @Output() searchOpen = new EventEmitter<void>();
    @Output() searchClose = new EventEmitter<void>();

    // outputs grid dialog
    @Output() dialogAction = new EventEmitter<Action>();
    @Output() dialogClose = new EventEmitter<void>();
    @Output() dialogColumnFiltersChange = new EventEmitter<GridState>();
    @Output() dialogColumnsConfigChange = new EventEmitter<ColumnConfig[]>();
    @Output() dialogOpen = new EventEmitter<void>();
    @Output() dialogStateChange = new EventEmitter<GridState>();
    @Output() dialogSearch = new EventEmitter<GridState>();
    @Output() dialogSearchOpen = new EventEmitter<void>();
    @Output() dialogSearchClose = new EventEmitter<void>();
    @Output() dialogSelectedCheckboxRowModelChange = new EventEmitter<SelectionChange<any>>();

    constructor(
        private dialog: MatDialog,
    ) {}

    handleElementsDialog(dialogConfig?: MatDialogConfig): void
    {
        this.elementsDialogRef = this.dialog.open(GridDialogComponent,
            {
                panelClass: 'au-dialog',
                maxHeight : '100vh',
                width     : '90vw',
                maxWidth  : '1024px',
                minWidth  : '240px',
                autoFocus : false,
                ...dialogConfig,
                data      : {
                    gridId                   : this.dialogGridId,
                    gridState                : this.dialogGridState,
                    originColumnsConfig      : this.dialogOriginColumnsConfig,
                    columnsConfig            : this.dialogColumnsConfig,
                    selectedRows             : this.dialogSelectedRows,
                    title                    : this.dialogTitle,
                    gridCustomHeadersTemplate: this.gridSelectMultipleCustomHeadersDialogTemplate,
                    gridCellValuesTemplate   : this.gridSelectMultipleCellValuesDialogTemplate,
                    ...dialogConfig?.data,
                },

            });

        // set gridData saved when component is created
        this.elementsDialogRef
            .componentInstance
            .gridDataSubject$.next(this.dialogGridData);

        this.elementsDialogRef
            .afterOpened()
            .subscribe(() => this.dialogOpen.next());

        this.elementsDialogRef
            .afterClosed()
            .subscribe(() => this.dialogClose.next());

        // pass change state event to parent component
        this.elementsDialogRef
            .componentInstance
            .stateChange
            .subscribe((state: GridState) => this.dialogStateChange.next(state));

        // pass on columns config change event to parent component
        this.elementsDialogRef
            .componentInstance
            .columnsConfigChange
            .subscribe((columnConfig: ColumnConfig[]) => this.dialogColumnsConfigChange.next(columnConfig));

        // pass on columns filters change event to parent component
        this.elementsDialogRef
            .componentInstance
            .columnFiltersChange
            .subscribe((state: GridState) => this.dialogColumnFiltersChange.next(state));

        // pass action click event to parent component
        this.elementsDialogRef
            .componentInstance
            .action
            .subscribe((action: Action) => this.dialogAction.next(action));

        // pass on selection row event to parent component
        this.elementsDialogRef
            .componentInstance
            .selectedCheckboxRowModelChange
            .subscribe((selectedCheckboxRowsModel: SelectionChange<any>) => this.dialogSelectedCheckboxRowModelChange.next(selectedCheckboxRowsModel));

        // pass search open event to parent component
        this.elementsDialogRef
            .componentInstance
            .searchOpen
            .subscribe(() => this.dialogSearchOpen.next());

        // pass search close event to parent component
        this.elementsDialogRef
            .componentInstance
            .searchClose
            .subscribe(() => this.dialogSearchClose.next());

        // pass search event to parent component
        this.elementsDialogRef
            .componentInstance
            .search
            .subscribe((state: GridState) => this.dialogSearch.next(state));
    }
}
