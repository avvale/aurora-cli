import { ColumnDataType } from './../grid.types';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslocoService } from '@ngneat/transloco';
import { map, Observable, startWith } from 'rxjs';
import { ColumnListItem } from '../grid.types';

@Component({
    selector   : 'au-full-filter-dialog',
    templateUrl: 'full-filter-dialog.component.html',
    styleUrls  : ['full-filter-dialog.component.scss'],
})

export class FullFilterDialogComponent implements OnInit
{
    // prev filters
    activeFilters: any[];
    activeFiltersValues: any;

    // form control picking
    filterFieldNameControl = new FormControl();
    columnsList: ColumnListItem[] = [];
    filteredColumnItems: Observable<ColumnListItem[]>;

    // field filters list
    fieldFilterList: ColumnListItem[] = [];
    columnConfigType = ColumnDataType;
    generatedForm: FormGroup;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _dialogRef: MatDialogRef<FullFilterDialogComponent>,
        private translateService: TranslocoService,
        private fb: FormBuilder,
    )
    {
        this.generatedForm = this.fb.group({});
    }

    // string criteria information
    stringCriteriaTypes = [
        {
            value      : 'eq',
            translation: 'Equals',
        },
        {
            value      : 'ne',
            translation: 'NotEquals',
        },
        {
            value      : 'startsWith',
            translation: 'StartsWith',
        },
        {
            value      : 'endsWith',
            translation: 'EndsWith',
        },
        {
            value      : 'substring',
            translation: 'Contains',
        },
    ];

    ngOnInit(): void
    {
        this.columnsList = this.data.columnsList;
        this.activeFilters = this.data.activeFilters;
        this.activeFiltersValues = this.data.activeFiltersValues;
        this.filteredColumnItems = this.filterFieldNameControl.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value)),
        );

        // add active filters
        if (this.activeFilters.length > 0)
            this.generatePreviousDataForm();

        this.generatedForm.valueChanges.subscribe(change =>
        {
            // if form is invalid, dont allow to create new form fields
            !this.generatedForm.valid
                ? this.filterFieldNameControl.disable()
                : this.filterFieldNameControl.enable();
        });
    }

    private _filter(value: string): ColumnListItem[]
    {
        // value is an object, so filter will trigger a type error
        if (typeof value !== 'string') return;

        // if value is empty, return all results
        if (!value || value == '') return this.columnsList;

        // translation is used to compare because it is what the users will see on screen (and what is relevant to them)
        const filterValue = value.toLowerCase();
        return this.columnsList.filter(col => this.translateService.translate('delfos.' + col.translation).toLowerCase().includes(filterValue));
    }

    onFieldSelectionChange(event: MatAutocompleteSelectedEvent): void
    {
        // value is reset instantly to avoid having an [object Object] in the field, as well as allowing for a new pick
        this.filterFieldNameControl.setValue('');
        const inputField = event.option.value.field;

        // current name could be evolving to avoid multiple form fields named the same
        let currentName = inputField;

        // counter acts as an suffix if needed (code => code1 => code2...)
        let counter = 0;

        // if field is not found, just progress to next step
        while (this.fieldFilterList.findIndex(field => field.field === currentName) !== -1)
        {
            counter++;

            // extra characters are used in case two similar forms with numbers exist:
            // ie: code & code_1
            // this makes sure cleanup on parent's event catcher is hard to bug out
            // as it will be using "split('_&')"
            currentName = `${inputField}_&${counter}`;
        }

        // control is added with current name (that is base + suffix if needed)
        this.generatedForm.addControl(currentName, this.fb.group({
            operator: this.fb.control('', [Validators.required]),
            value   : this.fb.control('', [Validators.required]),
        }));

        // field is pushed to array of filters in order to render a new form field in template
        this.sortFiltersArray(this.fieldFilterList, event.option.value.translation);
        this.fieldFilterList.unshift({ ...event.option.value, field: currentName, originalField: inputField });
    }

    generatePreviousDataForm(): void
    {
        this.activeFilters.forEach(filter =>
        {
            this.generatedForm.addControl(filter.field, this.fb.group({
                operator: this.fb.control(this.activeFiltersValues[filter.field]['operator'], [Validators.required]),
                value   : this.fb.control(this.activeFiltersValues[filter.field]['value'], [Validators.required]),
            }));
        });

        this.sortFiltersArray(this.activeFilters);
    }

    sortFiltersArray(baseArray: any[], firstField?: ColumnListItem): void
    {
        // when adding a new form element, it's inserted at the top
        // then it's followed by all elements with the same field
        // and then the rest of the fields
        if (firstField)
        {
            this.fieldFilterList = [...baseArray].sort((a, b) =>
            {
                if ( a.translation === firstField.translation ) return 1;
                return -1;
            });
        }
        else
        {
            this.fieldFilterList = [...baseArray].sort((a, b) =>
            {
                if ( a.translation === b.translation ) return -1;
                return 1;
            });
        }
    }

    deleteFilterField(field: ColumnListItem): void
    {
        this.generatedForm.removeControl(field.field);
        this.fieldFilterList = this.fieldFilterList.filter(currentField => currentField.field !== field.field);
    }

    shouldRenderOutbox(field: ColumnListItem): boolean
    {
        const similarFields = this.fieldFilterList.filter(fieldItem => fieldItem.translation === field.translation);
        const position = similarFields.indexOf(field);

        const output = position === similarFields.length - 1
            ? false
            : true;

        return output;
    }
}