import { AsyncPipe, LowerCasePipe, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnInit, QueryList } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { GridFiltersDialogValueTemplateDirective, Operator, Utils, getAsyncMatSelectSearchColumnConfigFunction } from '@aurora';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { Observable, map, startWith } from 'rxjs';
import { MatSelectAddSelectedDirective, MatSelectRemoveFor, ScrollEndDirective } from '../../../directives';
import { GetAsyncMatSelectSearchColumnConfig } from '../../async-mat-select-search';
import { DatepickerSqlFormatDirective } from '../../datepicker-sql-format';
import { GridTranslatePipe } from '../grid-translations/grid-translate.pipe';
import { GridTranslationsService } from '../grid-translations/grid-translations.service';
import { ColumnConfig, ColumnDataType, FilterCriteriaOperator, FilterDialogResponse, GridColumnFilter, SearchComponentType } from '../grid.types';
import { mapColumnDataToSearchComponentType } from './functions/map-column-data-to-search-component-type.function';
import { FilterOperatorsPipe } from './pipes/filter-operators.pipe';
import { GetConcatOperatorPipe } from './pipes/get-concat-operator.pipe';
import { GetGridFilterValue } from './pipes/get-grid-filter-value.pipe';
import { GetGridFiltersValue } from './pipes/get-grid-filter-values.pipe';
import { HasRenderOutboxPipe } from './pipes/has-render-outbox.pipe';

@Component({
    selector       : 'au-grid-filters-dialog',
    templateUrl    : 'grid-filters-dialog.component.html',
    styleUrls      : ['grid-filters-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone     : true,
    imports        : [
        AsyncPipe, DatepickerSqlFormatDirective, FilterOperatorsPipe,
        GetAsyncMatSelectSearchColumnConfig, GetConcatOperatorPipe,
        GetGridFiltersValue, GetGridFilterValue,
        GridTranslatePipe, HasRenderOutboxPipe, LowerCasePipe,
        MatAutocompleteModule, MatButtonModule,MatCheckboxModule,
        MatDatepickerModule, MatDialogModule, MatDividerModule,
        MatFormFieldModule, MatIconModule,  MatInputModule,
        MatSelectModule, MatSelectRemoveFor, NgTemplateOutlet,
        NgxMatSelectSearchModule, ReactiveFormsModule,
        MatSelectAddSelectedDirective, ScrollEndDirective,
    ],
})
export class GridFiltersDialogComponent implements OnInit
{
    gridId: string = 'grid';
    // get columns config from state to get the columns sorted
    columnsConfig: ColumnConfig[] = [];
    originColumnsConfig: ColumnConfig[] = [];
    // form control picking for fields search from autocomplete
    searchFieldNameControl = new FormControl();
    // columns filtered by autocomplete
    filteredColumnsConfig: Observable<ColumnConfig[]>;
    // data type can be a column
    columnDataType = ColumnDataType;
    // search component can be a column
    searchComponentType = SearchComponentType;
    // form filters components
    containerForm: FormGroup;
    // mapper to change column data to search component type
    mapColumnDataToSearchComponentType = mapColumnDataToSearchComponentType;
    // get async mat select search column config
    getAsyncMatSelectSearchColumnConfigFunction = getAsyncMatSelectSearchColumnConfigFunction;

    // create getter to form array
    get formColumnFilter(): FormArray
    {
        return this.containerForm.get('formColumnFilter') as FormArray;
    }
    get arrayColumnFilters(): GridColumnFilter[]
    {
        return this.formColumnFilter.value as GridColumnFilter[];
    }

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: {
            columnFilters: GridColumnFilter[];
            columnsConfig: ColumnConfig[];
            originColumnsConfig: ColumnConfig[];
            gridId: string;
            gridFiltersDialogValuesTemplate: QueryList<GridFiltersDialogValueTemplateDirective>;
        },
        private _dialogRef: MatDialogRef<GridFiltersDialogComponent>,
        private fb: FormBuilder,
        private gridTranslationsService: GridTranslationsService,
    )
    {
        // create form container
        this.containerForm = this.fb.group({
            formColumnFilter: this.fb.array([]),
        });

        this.gridId = data.gridId || this.gridId;
    }

    // string criteria information
    filterOperators: FilterCriteriaOperator[] = [
        {
            operator            : Operator.substring,
            translation         : 'contains',
            searchComponentTypes: [
                SearchComponentType.TEXT,
            ],
        },
        {
            operator            : Operator.overlap,
            translation         : 'containsAny',
            searchComponentTypes: [
                SearchComponentType.ASYNC_MULTIPLE_SELECT,
                SearchComponentType.MULTIPLE_SELECT,
            ],
        },
        {
            operator            : Operator.contains,
            translation         : 'mustContain',
            searchComponentTypes: [
                SearchComponentType.ASYNC_MULTIPLE_SELECT,
                SearchComponentType.MULTIPLE_SELECT,
            ],
        },
        {
            operator            : Operator.endsWith,
            translation         : 'endsWith',
            searchComponentTypes: [
                SearchComponentType.TEXT,
            ],
        },
        {
            operator            : Operator.eq,
            translation         : 'equals',
            searchComponentTypes: [
                SearchComponentType.TEXT,
                SearchComponentType.DATEPICKER,
                SearchComponentType.NUMBER,
                SearchComponentType.SELECT,
                SearchComponentType.CHECKBOX,
            ],
        },
        {
            operator            : Operator.gt,
            translation         : 'greaterThan',
            searchComponentTypes: [
                SearchComponentType.DATEPICKER,
                SearchComponentType.NUMBER,
            ],
        },
        {
            operator            : Operator.gte,
            translation         : 'greaterThanEqual',
            searchComponentTypes: [
                SearchComponentType.DATEPICKER,
                SearchComponentType.NUMBER,
            ],
        },
        {
            operator            : Operator.lt,
            translation         : 'lessThan',
            searchComponentTypes: [
                SearchComponentType.DATEPICKER,
                SearchComponentType.NUMBER,
            ],
        },
        {
            operator            : Operator.lte,
            translation         : 'lessThanEqual',
            searchComponentTypes: [
                SearchComponentType.DATEPICKER,
                SearchComponentType.NUMBER,
            ],
        },
        {
            operator            : Operator.ne,
            translation         : 'notEquals',
            searchComponentTypes: [
                SearchComponentType.TEXT,
                SearchComponentType.DATEPICKER,
                SearchComponentType.NUMBER,
                SearchComponentType.SELECT,
                SearchComponentType.CHECKBOX,
            ],
        },
        {
            operator            : Operator.startsWith,
            translation         : 'startsWith',
            searchComponentTypes: [
                SearchComponentType.TEXT,
            ],
        },
    ];

    ngOnInit(): void
    {
        // avoid columns not filterable
        this.columnsConfig = this.data.columnsConfig
            .filter(columnConfig =>
                columnConfig.filterable !== false &&
                columnConfig.type !== ColumnDataType.ACTIONS &&
                columnConfig.type !== ColumnDataType.CHECKBOX &&
                columnConfig.type !== ColumnDataType.DRAG_AND_DROP,
            );

        // get original columns config, to get values from columns selected
        this.originColumnsConfig = this.data.originColumnsConfig;

        // cerate subscription for filter columns in autocomplete component
        this.filteredColumnsConfig = this.searchFieldNameControl
            .valueChanges
            .pipe(
                startWith(''),
                map(value => this._filter(value)),
            );

        // add active filters
        this.generatePreviousDataForm(this.data.columnFilters);

        // only enabled search autocomplete if all filter columns are valid
        this.containerForm
            .valueChanges
            .subscribe(change =>
            {
                // if form is invalid, don't allow to create new form fields
                !this.containerForm.valid
                    ? this.searchFieldNameControl.disable()
                    : this.searchFieldNameControl.enable();
            });
    }

    private _filter(value: string): ColumnConfig[]
    {
        // value is an object, so filter will trigger a type error
        if (typeof value !== 'string') return;

        // if value is empty, return all results
        if (!value || value == '') return this.columnsConfig;

        // translation is used to compare because it is what the users will see on screen (and what is relevant to them)
        return this.columnsConfig.filter(columnConfig =>
        {
            // set scope of columnMessages with gridId
            const translation = Utils.removeSpecialCharacters(this.gridTranslationsService.columnMessages[this.gridId][columnConfig.field].getValue()).toLowerCase();
            const searchTerm  = Utils.removeSpecialCharacters(value).toLowerCase();
            return translation.includes(searchTerm);
        });
    }

    // function to manage filter column autocomplete is item selected
    handleFieldSelectionChange(event: MatAutocompleteSelectedEvent): void
    {
        // value is reset instantly to avoid having an [object Object] in the field, as well as allowing for a new pick
        this.searchFieldNameControl.setValue('');

        // field is pushed to array of filters in order to render a new form field in template
        this.formColumnFilter.patchValue(
            this.sortFiltersArray(this.arrayColumnFilters, event.option.value.field),
        );

        // control insert in first position, shifts the rest of the components
        this.formColumnFilter.insert(0,
            this.fb.group({
                id             : this.fb.control(Utils.uuid()),
                field          : this.fb.control(event.option.value.field),
                type           : this.fb.control(event.option.value.type),
                searchableField: this.fb.control(event.option.value.searchableField),
                searchComponent: this.fb.control(event.option.value.searchComponent || mapColumnDataToSearchComponentType(event.option.value.type)),
                operator       : this.fb.control(null, [Validators.required]),
                value          : this.fb.control('', [Validators.required]),
            }),
        );
    }

    generatePreviousDataForm(gridColumnsFilter: GridColumnFilter[]): void
    {
        if (gridColumnsFilter.length === 0) return;

        for (const gridColumnFilter of gridColumnsFilter)
        {
            this.formColumnFilter
                .push(
                    this.fb.group({
                        id             : this.fb.control(gridColumnFilter.id),
                        field          : this.fb.control(gridColumnFilter.field),
                        type           : this.fb.control(gridColumnFilter.type),
                        searchableField: this.fb.control(gridColumnFilter.searchableField),
                        searchComponent: this.fb.control(gridColumnFilter.searchComponent),
                        operator       : this.fb.control(gridColumnFilter.operator, [Validators.required]),
                        value          : this.fb.control(gridColumnFilter.value, [Validators.required]),
                    }),
                );
        }
    }

    /**
     * when adding a new form element, it's inserted at the top
     * then it's followed by all elements with the same field
     * and then the rest of the fields
     */
    sortFiltersArray(gridColumnsFilter: GridColumnFilter[], fieldOrderBy: string): ColumnConfig[]
    {
        return [...gridColumnsFilter]
            .sort((a, b) =>
            {
                if (a.field === fieldOrderBy) return -1;
                return 1;
            });
    }

    handleDeleteFilter(index: number): void
    {
        this.formColumnFilter.removeAt(index);
    }

    resetFilters(): void
    {
        for (const columnConfig of this.originColumnsConfig)
        {
            if (
                columnConfig.searchComponent === SearchComponentType.ASYNC_MULTIPLE_SELECT &&
                columnConfig.meta?.asyncMatSelectSearch?.asyncMatSelectSearchState?.selectedItems
            )
            {
                columnConfig
                    .meta
                    .asyncMatSelectSearch
                    .asyncMatSelectSearchState
                    .selectedItems
                    .set(new Set());
            }
        }
    }

    closeDialogAndRemoveFilters(): FilterDialogResponse
    {
        return {
            columnFilters: [],
        };
    }

    // manage response data after close dialog
    closeDialogAndSetFilters(): FilterDialogResponse
    {
        return {
            columnFilters: this.formColumnFilter.value,
        };
    }

}