import { AsyncPipe, NgForOf, NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Operator, Utils } from '@aurora';
import { GetPipe } from '@aurora/pipes/get.pipe';
import { Observable, map, startWith } from 'rxjs';
import { GridTranslatePipe } from '../grid-translations/grid-translate.pipe';
import { GridTranslationsService } from '../grid-translations/grid-translations.service';
import { ColumnConfig, ColumnDataType, FilterCriteriaOperator, FilterDialogResponse, GridColumnFilter, GridOperatorsMessages } from '../grid.types';
import { FilterOperatorsPipe } from './pipes/filter-operators.pipe';
import { HasRenderOutboxPipe } from './pipes/has-render-outbox.pipe';

@Component({
    selector       : 'au-grid-filters-dialog',
    templateUrl    : 'grid-filters-dialog.component.html',
    styleUrls      : ['grid-filters-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone     : true,
    imports        : [
        AsyncPipe, FilterOperatorsPipe, GetPipe, GridTranslatePipe, HasRenderOutboxPipe, MatAutocompleteModule, MatButtonModule, MatDialogModule, MatFormFieldModule, MatIconModule,
        MatInputModule, MatSelectModule, NgForOf, NgIf, NgSwitch, NgSwitchCase, ReactiveFormsModule
    ],
})
export class GridFiltersDialogComponent implements OnInit
{
    gridId: string = 'grid';
    columnsConfig: ColumnConfig[] = [];
    // form control picking for fields search from autocomplete
    searchFieldNameControl = new FormControl();
    // columns filtered by autocomplete
    filteredColumnsConfig: Observable<ColumnConfig[]>;
    // operator translations
    operatorsMessages: Observable<GridOperatorsMessages>;
    // data type can be a column
    columnDataType = ColumnDataType;
    // form filters components
    containerForm: FormGroup;
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
        @Inject(MAT_DIALOG_DATA) public data: any,
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
            operator   : Operator.substring,
            translation: 'contains',
            types      : [ColumnDataType.STRING],
        },
        {
            operator   : Operator.endsWith,
            translation: 'endsWith',
            types      : [ColumnDataType.STRING],
        },
        {
            operator   : Operator.eq,
            translation: 'equals',
            types      : [ColumnDataType.STRING, ColumnDataType.DATE, ColumnDataType.NUMBER],
        },
        {
            operator   : Operator.gt,
            translation: 'greaterThan',
            types      : [ColumnDataType.DATE, ColumnDataType.NUMBER],
        },
        {
            operator   : Operator.gte,
            translation: 'greaterThanEqual',
            types      : [ColumnDataType.DATE, ColumnDataType.NUMBER],
        },
        {
            operator   : Operator.lt,
            translation: 'lessThan',
            types      : [ColumnDataType.DATE, ColumnDataType.NUMBER],
        },
        {
            operator   : Operator.lte,
            translation: 'lessThanEqual',
            types      : [ColumnDataType.DATE, ColumnDataType.NUMBER],
        },
        {
            operator   : Operator.ne,
            translation: 'notEquals',
            types      : [ColumnDataType.STRING, ColumnDataType.DATE, ColumnDataType.NUMBER],
        },
        {
            operator   : Operator.startsWith,
            translation: 'startsWith',
            types      : [ColumnDataType.STRING],
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

        // cerate subscription for filter columns in autocomplete component
        this.filteredColumnsConfig = this.searchFieldNameControl
            .valueChanges
            .pipe(
                startWith(''),
                map(value => this._filter(value)),
            );

        // set operator translations
        this.operatorsMessages = this.gridTranslationsService.getOperatorsMessages(this.gridId);

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

    // manage response data after close dialog
    handleCloseDialog(): FilterDialogResponse
    {
        return {
            columnFilters: this.formColumnFilter.value,
        };
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

    /**
     * Function to manage filter column autocomplete is item selected
     */
    handleFieldSelectionChange(event: MatAutocompleteSelectedEvent): void
    {
        // value is reset instantly to avoid having an [object Object] in the field, as well as allowing for a new pick
        this.searchFieldNameControl.setValue('');

        // field is pushed to array of filters in order to render a new form field in template
        this.formColumnFilter.patchValue(
            this.sortFiltersArray(this.arrayColumnFilters, event.option.value.field),
        );

        // control insert in first position
        this.formColumnFilter.insert(0,
            this.fb.group({
                id      : this.fb.control(Utils.uuid()),
                field   : this.fb.control(event.option.value.field),
                type    : this.fb.control(event.option.value.type),
                operator: this.fb.control(null, [Validators.required]),
                value   : this.fb.control('', [Validators.required]),
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
                        id      : this.fb.control(gridColumnFilter.id),
                        field   : this.fb.control(gridColumnFilter.field),
                        type    : this.fb.control(gridColumnFilter.type),
                        operator: this.fb.control(gridColumnFilter.operator, [Validators.required]),
                        value   : this.fb.control(gridColumnFilter.value, [Validators.required]),
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

    handleRemoveFilters(): FilterDialogResponse
    {
        return {
            columnFilters: [],
        };
    }
}