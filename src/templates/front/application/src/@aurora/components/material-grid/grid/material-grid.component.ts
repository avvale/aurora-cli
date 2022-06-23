// angular
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, EventEmitter, Input, OnInit, Output, QueryList, ViewChild } from '@angular/core';
import { CommonLang } from '@aurora/modules';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

// aurora
import { ActionEvent, ColumnConfig, ColumnConfigAction, ColumnDataType, GridData, GridTranslations, PageChangeEvent, FilterEvent } from '../grid.types';
import { CellValueTemplateDirective } from '../directives/cell-value-template.directive';
import { ColumnsDialogComponent } from '../columns-dialog/columns-dialog.component';
import { FullFilterDialogComponent } from '../full-filter-dialog/full-filter-dialog.component';

// third party libraries
import { merge, Subject, tap } from 'rxjs';
import cloneDeep from 'lodash-es/cloneDeep';

@Component({
    selector       : 'au-material-grid',
    templateUrl    : './material-grid.component.html',
    styleUrls      : ['./material-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialGridComponent implements OnInit, AfterViewInit
{
    // inputs
    @Input() data: GridData;
    // langs to create TranslationMenuComponent form multi language objects
    @Input() langs: CommonLang[] = [];
    // translations for component
    @Input() translations: GridTranslations = {
        Columns: 'Columns',
        Delete : 'Delete',
        Edit   : 'Edit',
    };

    // view children
    @ViewChild(MatPaginator) private paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    // directive to ser custom values in cells
    @ContentChildren(CellValueTemplateDirective) cellValuesTemplate?: QueryList<CellValueTemplateDirective>;

    // outputs
    @Output() pageChange = new EventEmitter<PageChangeEvent>();
    @Output() action = new EventEmitter<ActionEvent>();
    @Output() closeColumnDialog = new EventEmitter<void>();
    @Output() columnsConfigChanged = new EventEmitter<ColumnConfig[]>();
    @Output() filtersChange = new EventEmitter<FilterEvent>();

    // set columns types for render each web component
    columnConfigType = ColumnDataType;
    columnsDialog = ColumnsDialogComponent; // dialog to sort columns
    filterDialog = FullFilterDialogComponent; // dialog to sort columns
    changeColumnsConfig$: Subject<ColumnConfig[]> = new Subject();

    // clone columnsConfig to can reset columnsConfig to original status
    private _columnsConfig: ColumnConfig[] = [];
    private _originColumnsConfig: ColumnConfig[] = [];
    @Input() set columnsConfig(data: ColumnConfig[])
    {
        this._columnsConfig = cloneDeep(data);
        this._originColumnsConfig = cloneDeep(data);
    }
    get columnsConfig(): ColumnConfig[]
    {
        return this._columnsConfig;
    }

    get displayedColumns(): string[]
    {
        return this.columnsConfig
            .filter(item => !item.hidden)
            .map(item => item.field);
    }

    // active filters
    activeFilters: {
        translation  : string;
        field        : string;
        type         : number;
        originalField: string;
    }[] = [];

    activeFiltersValues: any;

    constructor(protected dialog: MatDialog, private changeDetection: ChangeDetectorRef) { }

    ngOnInit(): void
    {
        this.changeColumnsConfig$
            .subscribe(columnsConfig => this.columnsConfigChanged.emit(columnsConfig));
    }

    ngAfterViewInit(): void
    {
        if (this.paginator && this.sort)
        {
            // Reset back to the first page after sort
            this.sort.sortChange.subscribe(
                () => (this.paginator.pageIndex = 0),
            );

            merge(this.paginator.page, this.sort.sortChange)
                .pipe(
                    tap(() =>
                        this.pageChange.emit({
                            count : this.paginator.length,
                            offset:
                                this.paginator.pageIndex *
                                this.paginator.pageSize,
                            limit: this.paginator.pageSize,
                            sort : this.sort.active,
                            order: this.sort.direction,
                        }),
                    ),
                )
                .subscribe();
        }
    }

    handleClickAction(
        action: ColumnConfigAction,
        row: any,
        event: PointerEvent,
    ): void
    {
        this.action.emit({ action, row, event });
    }

    handleColumnsDialog(): void
    {
        const dialogRef = this.dialog.open(this.columnsDialog,
            {
                width    : '90vw',
                maxWidth : '420px',
                minWidth : '240px',
                maxHeight: '420px',
                autoFocus: false,
                data     : {
                    columnsConfig       : this.columnsConfig,
                    translations        : this.translations,
                    changeColumnsConfig$: this.changeColumnsConfig$,
                },
            });

        dialogRef.afterClosed().subscribe(res =>
        {
            this.closeColumnDialog.emit();
        });
    }

    toggleFilter(): void
    {
        const dialogRef = this.dialog.open(this.filterDialog,
            {
                width    : '90vw',
                maxWidth : '600px',
                minWidth : '240px',
                height   : '75vh',
                autoFocus: false,
                data     : {
                    activeFilters      : this.activeFilters,
                    activeFiltersValues: this.activeFiltersValues,
                    // slice is used to avoid 'actions' column
                    columnsList        : [...this.columnsConfig
                        .filter(col => col.filterable != false)
                        .map(col => { return { translation: col.translation, field: col.field, type: col.type }; })
                        .slice(1)],
                },
            });

        dialogRef.afterClosed().subscribe(res =>
        {
            // if just cancelled
            if ((!res?.formValue || res?.filters.length === 0) && res !== 'removeFilters') return;

            // if filters to be removed
            if (res === 'removeFilters')
            {
                this.activeFilters = [];
                this.activeFiltersValues = null;
                this.filtersChange.emit(null);
                return;
            }

            const fv = res.formValue;

            // base fields to be used for queries
            const baseFields = res.filters.map(f =>
            {
                return { field: f.originalField, type: f.type };
            });

            // query to be sent to GQL
            const queryFilter = {};

            // form values have modified keys, so we need to find exact base field
            const fvKeys = Object.keys(fv);
            const filterArrays = {};

            // this initializes the filterArrays object so it can be copied later on
            fvKeys.forEach(key =>
            {
                filterArrays[key.split('_&')[0]] = [];
            });

            // for each form value key, get the original form of the key (splitting) and add the operator (eq, ne, etc)
            fvKeys.forEach(key =>
            {
                filterArrays[key.split('_&')[0]] = [
                    ...filterArrays[key.split('_&')[0]],
                    { [`[${[fv[key].operator]}]`]: fv[key].value },
                ];
            });

            // this will add operators and concatenate filters
            baseFields.forEach(field =>
            {
                queryFilter[field.field] = {
                    [field.type === 3 ? '[and]' : '[or]']: [...filterArrays[field.field]],
                };
            });

            // this saves filters so they are kept after closing the dialog
            this.activeFilters = res.filters;
            this.activeFiltersValues = res.formValue;

            // event is emitted so parent component handles querying
            this.filtersChange.emit({ where: { ...queryFilter }});

            this.changeDetection.detectChanges();
        });
    }
}
