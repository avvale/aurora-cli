import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { AsyncPipe, NgForOf, NgIf, NgSwitch, NgSwitchCase, NgTemplateOutlet } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, EventEmitter, Input, OnInit, Output, QueryList, ViewChild } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { Action, GridManagerService } from '@aurora';
import { FlagIconComponent } from '@aurora/components/flag-icon';
import { GetPipe } from '@aurora/pipes/get.pipe';
import { merge, tap } from 'rxjs';
import { GridCellValueTemplateDirective } from '../directives/grid-cell-value-template.directive';
import { GridCustomHeaderTemplateDirective } from '../directives/grid-custom-header-template.directive';
import { GridColumnsConfigPropertiesDialogComponent } from '../grid-columns-config-properties-dialog/grid-columns-config-properties-dialog.component';
import { GridFiltersDialogComponent } from '../grid-filters-dialog/grid-filters-dialog.component';
import { GridSearchComponent } from '../grid-search/grid-search.component';
import { GridTranslatePipe } from '../grid-translations/grid-translate.pipe';
import { ColumnConfig, ColumnConfigAction, ColumnDataType, ExportFormat, ExportGridState, GridColumnFilter, GridData, GridSearchState, GridSortState, GridState } from '../grid.types';
import { FilterGridCustomHeaderTemplatesPositionPipe, GetActionsPipe, GetGridSpinnerFlagPipe, GetTranslationIconColorPipe, HasCellValueTemplatePipe, IsOriginColumnConfigPipe, TransformDataCellPipe } from '../pipes';
import { SelectionChange, SelectionModel } from '../selection-model/selection-model';

// no barrel
@Component({
    selector       : 'au-grid',
    templateUrl    : './grid.component.html',
    styleUrls      : ['./grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone     : true,
    imports        : [
        AsyncPipe, DragDropModule, FilterGridCustomHeaderTemplatesPositionPipe, FlagIconComponent, GetActionsPipe, GetGridSpinnerFlagPipe, GetPipe, GridSearchComponent, GridTranslatePipe, GetTranslationIconColorPipe,
        HasCellValueTemplatePipe, IsOriginColumnConfigPipe, MatBadgeModule, MatButtonModule, MatCheckboxModule, MatIconModule, MatMenuModule, MatPaginatorModule, MatSortModule, MatTableModule,
        NgForOf, NgIf, NgSwitch, NgSwitchCase, NgTemplateOutlet, TransformDataCellPipe,
    ],
})
export class GridComponent implements OnInit, AfterViewInit
{
    // set columns types for render each web component
    columnConfigType = ColumnDataType;
    exportFormat = ExportFormat;

    @Input() id: string = 'grid';
    @Input() gridManagerService: GridManagerService;
    // input data rows
    @Input() gridData: GridData;
    // input columns config, data non-mutable
    @Input() readonly originColumnsConfig: ColumnConfig[] = [];
    // set selected rows, will be the selected objects contained in the grid
    @Input() selectedRows: any[] = [];
    // model to manage the comparison of the selected objects and to set whether the checkbox is selected or not
    @Input() selectedCheckboxRowModel = new SelectionModel<any>(true, [], true, (a: any, b: any) => a.id === b.id);
    @Input() hasFilterButton: boolean = true;
    @Input() hasExportButton: boolean = true;
    @Input() hasSearch: boolean = true;
    @Input() hasColumnsConfigPropertiesButton: boolean = true;
    @Input() hasPagination: boolean = true;
    @Input() hasDragAndDrop: boolean = false;

    // manage all grid state, or part of it
    // set grid state to load grid with specific state with sort and filters
    private _gridState: GridState = {
        columnsConfig: [],
        columnFilters: [],
        sort         : {
            active   : 'createdAt',
            direction: 'asc',
        },
    };
    @Input() set gridState(gridState: GridState)
    {
        this._gridState = {
            ...this._gridState,
            ...gridState,
        };
    }
    get gridState(): GridState
    {
        return this._gridState;
    }
    @Input() set columnsConfig(columnsConfig: ColumnConfig[])
    {
        if (Array.isArray(columnsConfig)) this.gridState.columnsConfig = columnsConfig;
    }
    @Input() set columnFilters(columnFilters: GridColumnFilter[])
    {
        this.gridState.columnFilters = columnFilters ? columnFilters : [];
    }

    // outputs
    @Output() action = new EventEmitter<Action>();
    @Output() closeColumnDialog = new EventEmitter<void>();
    @Output() columnFiltersChange = new EventEmitter<GridColumnFilter[]>();
    @Output() columnsConfigChange = new EventEmitter<ColumnConfig[]>();
    @Output() exportData = new EventEmitter<ExportGridState>();
    @Output() pageChange = new EventEmitter<PageEvent>();
    @Output() resetColumnsConfig = new EventEmitter<void>();
    @Output() rowDrop = new EventEmitter<CdkDragDrop<any>>();
    @Output() selectedCheckboxRowModelChange = new EventEmitter<SelectionChange<any>>();
    @Output() searchChange = new EventEmitter<GridSearchState>();
    @Output() sortChange = new EventEmitter<GridSortState>();
    @Output() stateChange = new EventEmitter<GridState>();

    // view children
    @ViewChild(MatPaginator) private paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    // directive to set custom values in cells
    @ContentChildren(GridCellValueTemplateDirective) gridCellValuesTemplate?: QueryList<GridCellValueTemplateDirective>;
    // add custom header
    @ContentChildren(GridCustomHeaderTemplateDirective) gridCustomHeadersTemplate?: QueryList<GridCustomHeaderTemplateDirective>;

    get displayedColumns(): string[]
    {
        return this.gridState
            .columnsConfig?.filter(item => !item.hidden)
            .map(item => item.field);
    }

    constructor(
        protected readonly dialog: MatDialog,
        private readonly changeDetection: ChangeDetectorRef,
        // service built from IoC, probably defined in app.module
        private readonly gridManagerServiceAdapter: GridManagerService,
    ) { }

    ngOnInit(): void
    {
        // if gridManagerService is not defined from @Input property, use the one from IoC
        if (!this.gridManagerService) this.gridManagerService = this.gridManagerServiceAdapter;

        if (!this.gridManagerService) throw new Error(`
            GridManagerService is not defined, has to be defined from the @Input property or from the Ioc container.
            Example from Ioc:

            @NgModule({
                providers: [

                    {
                        provide : GridManagerService,
                        useClass: AuroraGridManagerService,
                    },
                ],
                bootstrap: [
                    AppComponent,
                ],
            })
            export class AppModule
            {
            }

            Example from @Input:

            <au-grid
                [id]="gridId"
                [gridManagerService]="gridManagerService"
            >
            </au-grid>
        `);

        this.selectedCheckboxRowModel
            .changed
            .subscribe(selectionCheckboxModelChanged => this.selectedCheckboxRowModelChange.emit(selectionCheckboxModelChanged));

        // if exist selectedRows items, set rows selection
        if (this.selectedRows.length > 0) this.selectedCheckboxRowModel.select(...this.selectedRows);
    }

    // manage paginator and sort events
    ngAfterViewInit(): void
    {
        if (this.paginator && this.sort)
        {
            // subscribe to sort event and paginator event
            merge(
                this.paginator.page,
                this.sort.sortChange,
            )
                .pipe(
                    tap((data: Sort | PageEvent) =>
                    {
                        if (
                            'active' in data &&
                            'direction' in data
                        )
                        {
                            // is a sort event
                            // Reset back to the first page after sorting
                            this.paginator.pageIndex = 0;

                            // set sort from GridSortState
                            this.gridState.sort = data;

                            // grid handle manager service
                            this.gridManagerService.handleSortStateChange(
                                this.id,
                                data,
                            );

                            // handle output event
                            this.sortChange.emit(data);
                        }

                        // create grid state
                        this.gridState = {
                            ...this.gridState,
                            page: {
                                length   : this.paginator.length,
                                pageIndex: this.paginator.pageIndex,
                                pageSize : this.paginator.pageSize,
                            },
                        };

                        // grid handle manager service
                        // this method triggers an Action handled by the parent component
                        this.gridManagerService.handleStateChange(
                            this.id,
                            this.gridState,
                            this.gridState.columnsConfig,
                        );

                        // handle output event
                        this.stateChange.emit(this.gridState);
                    }),
                )
                .subscribe();
        }
    }

    // manage grid rows menu actions
    handleClickAction(
        columnConfigAction: ColumnConfigAction,
        row: any,
        event: PointerEvent,
    ): void
    {
        const action = {
            ...columnConfigAction,
            meta: {
                ...columnConfigAction.meta,
                row,
                event,
            },
        };

        // grid handle manager service
        this.gridManagerService.handleGridAction(action);

        // handle output event
        this.action.emit(action);
    }

    handlePageStateChange(pageEvent: PageEvent): void
    {
        // grid handle manager service
        this.gridManagerService.handlePageStateChange(
            this.id,
            pageEvent,
        );

        // handle output event
        this.pageChange.emit(pageEvent);
    }

    /**
     * manage columns config properties in dialog
     */
    handleColumnsConfigPropertiesDialog(): void
    {
        const columnsConfigPropertiesDialogRef = this.dialog.open(GridColumnsConfigPropertiesDialogComponent,
            {
                panelClass: 'au-dialog',
                maxHeight : '100vh',
                width     : '90vw',
                maxWidth  : '420px',
                minWidth  : '240px',
                autoFocus : false,
                data      : {
                    gridId             : this.id,
                    columnsConfig      : this.gridState.columnsConfig,
                    originColumnsConfig: this.originColumnsConfig,
                },
            });

        // emit columnsConfigChange event
        columnsConfigPropertiesDialogRef
            .componentInstance
            .columnsConfigChange
            .subscribe($event =>
            {
                this.gridState.columnsConfig = $event.columnsConfig,

                // grid handle manager service
                this.gridManagerService.handleColumnsConfigChange(
                    this.id,
                    this.gridState.columnsConfig,
                    this.originColumnsConfig,
                );

                // handle output event
                this.columnsConfigChange.emit(this.gridState.columnsConfig);

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
                panelClass: 'au-dialog',
                maxHeight : '100vh',
                width     : '90vw',
                maxWidth  : '600px',
                minWidth  : '240px',
                autoFocus : false,
                data      : {
                    columnFilters: this.gridState.columnFilters,
                    columnsConfig: this.gridState.columnsConfig,
                    gridId       : this.id,
                },
            });

        gridFilterDialogRef
            .afterClosed()
            .subscribe(data =>
            {
                // dialog is closed without actions
                // must check string empty
                if (!data) return;

                this.gridState = {
                    ...this.gridState,
                    columnFilters: data.columnFilters,
                    page         : {
                        // on filter, reset paginate to first page
                        length   : this.paginator.length,
                        pageIndex: 0,
                        pageSize : this.paginator.pageSize,
                    },
                };

                // grid handle manager service
                // this method triggers an Action handled by the parent component
                this.gridManagerService.handleStateChange(
                    this.id,
                    this.gridState,
                    this.gridState.columnsConfig,
                );

                // handle output event
                this.stateChange.emit(this.gridState);

                // grid handle manager service
                this.gridManagerService.handleColumnFiltersChange(
                    this.id,
                    data.columnFilters,
                );

                // handle output event
                this.columnFiltersChange.emit(data.columnFilters);

                // refresh view to update number of filters activated
                this.changeDetection.markForCheck();
            });
    }

    handleSearchStateChange($event: GridSearchState): void
    {
        // grid handle manager service
        this.gridManagerService.handleSearchStateChange(
            this.id,
            $event,
            this.columnsConfig,
        );

        // handle output event
        this.searchChange.emit($event);
    }

    /*
    * manage grid search
    */
    handleSearch($event: GridSearchState): void
    {
        const page = {
            // on filter, reset paginate to first page
            length   : this.paginator.length,
            pageIndex: 0,
            pageSize : this.paginator.pageSize,
        };

        this.gridState = {
            ...this.gridState,
            search: $event,
            page,
        };

        // set page in page state, to avoid the empty page when
        // exiting and returning to the list, because it is in a
        // forward pagination before the search is performed.
        this.handlePageStateChange(page);

        // grid handle manager service
        // this method triggers an Action handled by the parent component
        this.gridManagerService.handleStateChange(
            this.id,
            this.gridState,
            this.gridState.columnsConfig,
        );

        // handle output event
        this.stateChange.emit(this.gridState);
    }

    handleExport(
        $event: PointerEvent,
        format: ExportFormat,
    ): void
    {
        const { columnFilters, search, sort } = this.gridState;

        const gridState = {
            columnFilters,
            sort,
        };

        // check search is valid value
        if (search) gridState['search'] = search;

        // grid handle manager service
        // this method triggers an Action handled by the parent component
        this.gridManagerService.handleExportData(
            this.id,
            this.gridState,
            this.columnsConfig,
            format,
        );

        // handle output event
        this.exportData.emit({
            gridState,
            format,
        });
    }

    /**
     * selection checkbox column methods
     */
    isAllSelected(): boolean
    {
        return this.selectedCheckboxRowModel.isAllSelected(this.gridData.rows);
    }

    isSomeSelected(): boolean
    {
        return this.selectedCheckboxRowModel.isSomeSelected(this.gridData.rows);
    }

    masterToggle(): void
    {
        if (this.isAllSelected())
        {
            this.selectedCheckboxRowModel.deselect(...this.gridData.rows);
            return;
        }
        this.selectedCheckboxRowModel.select(...this.gridData.rows);
    }

    checkboxLabel(row?: any): string
    {
        if (!row) return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
        return `${this.selectedCheckboxRowModel.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
    }
}
