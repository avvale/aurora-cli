// angular
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, EventEmitter, Input, OnInit, Output, QueryList, ViewChild } from '@angular/core';
import { CommonLang } from '@aurora/modules';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

// aurora
import { ColumnConfig, ColumnConfigAction, ColumnDataType, GridData, GridColumnFilter, GridState } from '../grid.types';
import { GridCellValueTemplateDirective } from '../directives/grid-cell-value-template.directive';
import { GridCustomHeaderTemplateDirective } from '../directives/grid-custom-header-template.directive';
import { GridColumnsConfigPropertiesDialogComponent } from '../grid-columns-config-properties-dialog/grid-columns-config-properties-dialog.component';
import { GridFiltersDialogComponent } from '../grid-filters-dialog/grid-filters-dialog.component';
import { SelectionChange, SelectionModel } from '../selection-model/selection-model';

// third party libraries
import { merge, tap } from 'rxjs';
import { Action } from '@aurora';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
    selector       : 'au-grid',
    templateUrl    : './grid.component.html',
    styleUrls      : ['./grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridComponent implements OnInit, AfterViewInit
{
    @Input() id: string = 'grid';
    // input data rows
    @Input() data: GridData;
    @Input() columnsConfig: ColumnConfig[] = [];
    @Input() originColumnsConfig: ColumnConfig[] = [];
    // set rows selection
    @Input() selectedRows: any[] = [];
    // selection checkbox column
    @Input() rowsSelection = new SelectionModel<any>(true, [], true, (a: any, b: any) => a.id === b.id);
    @Input() hasFilterButton: boolean = true;
    @Input() hasColumnsConfigPropertiesButton: boolean = true;
    @Input() hasPagination: boolean = true;
    @Input() hasDragAndDrop: boolean = false;

    // column filters activated
    private _activatedColumnFilters: GridColumnFilter[];
    @Input() set activatedColumnFilters(columnFilters: GridColumnFilter[])
    {
        this._activatedColumnFilters = columnFilters;
    }
    get activatedColumnFilters(): GridColumnFilter[]
    {
        // we make sure that it has an empty array as default value, to avoid errors due to undefined value
        return Array.isArray(this._activatedColumnFilters) ? this._activatedColumnFilters :[];
    }

    // langs to create TranslationMenuComponent form multi language objects
    @Input() langs: CommonLang[] = [];

    // view children
    @ViewChild(MatPaginator) private paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    // directive to set custom values in cells
    @ContentChildren(GridCellValueTemplateDirective) cellValuesTemplate?: QueryList<GridCellValueTemplateDirective>;

    // add custom header
    @ContentChildren(GridCustomHeaderTemplateDirective) gridCustomHeadersTemplate?: QueryList<GridCustomHeaderTemplateDirective>;

    // outputs
    @Output() action = new EventEmitter<Action>();
    @Output() closeColumnDialog = new EventEmitter<void>();
    @Output() columnFiltersChange = new EventEmitter<GridState>();
    @Output() columnsConfigChange = new EventEmitter<ColumnConfig[]>();
    @Output() pageChange = new EventEmitter<GridState>();
    @Output() resetColumnsConfig = new EventEmitter<void>();
    @Output() rowDrop = new EventEmitter<CdkDragDrop<any>>();
    @Output() rowsSelectionChange = new EventEmitter<SelectionChange<any>>();
    @Output() stateChange = new EventEmitter<GridState>();

    // set columns types for render each web component
    columnConfigType = ColumnDataType;

    get displayedColumns(): string[]
    {
        return this.columnsConfig?.filter(item => !item.hidden)
            .map(item => item.field);
    }

    constructor(
        protected dialog: MatDialog,
        private changeDetection: ChangeDetectorRef,
    ) { }

    ngOnInit(): void
    {
        this.rowsSelection
            .changed
            .subscribe(selectionChange => this.rowsSelectionChange.emit(selectionChange));

        // if exist selectedRows items, set rows selection
        if (this.selectedRows.length > 0) this.rowsSelection.select(...this.selectedRows);
    }

    ngAfterViewInit(): void
    {
        if (this.paginator && this.sort)
        {
            // Reset back to the first page after sort
            this.sort
                .sortChange
                .subscribe(
                    () => (this.paginator.pageIndex = 0),
                );

            // subscribe to sort event and paginator event
            merge(this.paginator.page, this.sort.sortChange)
                .pipe(
                    tap(() =>
                    {
                        const gridState = {
                            columnFilters: this.activatedColumnFilters,
                            count        : this.paginator.length,
                            offset       :
                                this.paginator.pageIndex *
                                this.paginator.pageSize,
                            limit: this.paginator.pageSize,
                            order: [[this.sort.active, this.sort.direction]],
                        };

                        this.stateChange.emit(gridState);
                        this.pageChange.emit(gridState);
                    }),
                )
                .subscribe();
        }
    }

    handleClickAction(
        columnConfigAction: ColumnConfigAction,
        row: any,
        event: PointerEvent,
    ): void
    {
        this.action.emit({
            ...columnConfigAction,
            data: {
                ...columnConfigAction.data,
                row,
                event,
            },
        });
    }

    /**
     * manage columns config properties in dialog
     */
    handleColumnsConfigPropertiesDialog(): void
    {
        const columnsConfigPropertiesDialogRef = this.dialog.open(GridColumnsConfigPropertiesDialogComponent,
            {
                width    : '90vw',
                maxWidth : '420px',
                minWidth : '240px',
                autoFocus: false,
                data     : {
                    columnsConfig      : this.columnsConfig,
                    originColumnsConfig: this.originColumnsConfig,
                },
            });

        // emit columnsConfigChange event
        columnsConfigPropertiesDialogRef
            .componentInstance
            .columnsConfigChange
            .subscribe($event =>
            {
                this.columnsConfig = $event.columnsConfig,
                this.columnsConfigChange.emit(this.columnsConfig);
                this.changeDetection.markForCheck();
            });

        //
        columnsConfigPropertiesDialogRef.afterClosed().subscribe(res => this.closeColumnDialog.emit());
    }

    /*
    * manage filters column grid
    */
    handleFiltersDialog(): void
    {
        const gridFilterDialogRef = this.dialog.open(GridFiltersDialogComponent,
            {
                width    : '90vw',
                maxWidth : '600px',
                minWidth : '240px',
                height   : '75vh',
                autoFocus: false,
                data     : {
                    activatedColumnFilters: this.activatedColumnFilters,
                    columnsConfig         : this.columnsConfig,
                    gridId                : this.id,
                },
            });

        gridFilterDialogRef
            .afterClosed()
            .subscribe(res =>
            {
                // dialog is closed without actions
                if (res === undefined) return;

                // this saves filters so they are kept after closing the dialog
                this.activatedColumnFilters = res.columnFilters;

                const gridState = {
                    columnFilters: this.activatedColumnFilters,
                    count        : this.paginator.length,
                    offset       : 0,
                    limit        : this.paginator.pageSize,
                    order        : [[this.sort.active, this.sort.direction]],
                };

                // emit event
                this.stateChange.emit(gridState);
                this.columnFiltersChange.emit(gridState);

                // refresh view to update number of filters activated
                this.changeDetection.markForCheck();
            });
    }

    /*
    * manage grid search
    */
    handleSearchOpen(): void
    {
        console.log('handleSearchOpen');
    }

    handleSearchClose(): void
    {
        console.log('handleSearchClose');
    }

    handleSearch($event): void
    {
        console.log('handleSearch', $event);
    }

    /**
     * selection checkbox column methods
     */
    isAllSelected(): boolean
    {
        return this.rowsSelection.isAllSelected(this.data.rows);
    }

    isSomeSelected(): boolean
    {
        return this.rowsSelection.isSomeSelected(this.data.rows);
    }

    masterToggle(): void
    {
        if (this.isAllSelected())
        {
            this.rowsSelection.deselect(...this.data.rows);
            return;
        }
        this.rowsSelection.select(...this.data.rows);
    }

    checkboxLabel(row?: any): string
    {
        if (!row) return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
        return `${this.rowsSelection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
    }
}
