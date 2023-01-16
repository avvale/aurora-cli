import { Component, Input, forwardRef, Injector, Inject, INJECTOR } from '@angular/core';
import { ControlValueAccessor, NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Appearance } from '@aurora';
import * as dayjs from 'dayjs';

@Component({
    selector: 'au-datepicker',
    template: `
        <mat-form-field
            [appearance]="appearance"
            [attr.tiny]="tiny"
            [attr.small]="small"
        >
            <mat-label>{{ label }}</mat-label>
            <input
                autocomplete="off"
                matInput
                [formControl]="control.control"
                [required]="required"
                [matDatepicker]="picker"
                [value]="dateValue"
                (dateInput)="handleDateInput('input', $event)"
            >
            <mat-datepicker-toggle
                matSuffix
                [for]="picker"
            >
            </mat-datepicker-toggle>
            <mat-datepicker #picker></mat-datepicker>
            <mat-error>{{ error }}</mat-error>
        </mat-form-field>`,
    styleUrls: [
        './datepicker.component.scss',
    ],
    providers: [
        {
            provide    : NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DatepickerComponent),
            multi      : true,
        },
    ],
})
export class DatepickerComponent implements ControlValueAccessor
{
    @Input() appearance: Appearance = 'legacy'; // 'legacy' | 'standard' | 'fill' | 'outline'
    @Input() format = 'YYYY-MM-DD';
    @Input() label: string;
    @Input() required = false;
    @Input() debug = false;
    @Input() error: string;
    @Input() _dateValue: string; // notice the '_'
    @Input() tiny: boolean;
    @Input() small: boolean;

    control: NgControl;

    set dateValue(val)
    {
        this._dateValue = dayjs(val).format(this.format);
        this.propagateChange(this._dateValue);
    }

    get dateValue() :string
    {
        return dayjs(this._dateValue).format(this.format);
    }

    constructor(
        @Inject(INJECTOR) private injector: Injector,
    )
    {}

    ngOnInit(): void
    {
        this.control = this.injector.get(NgControl);
    }

    handleDateInput(type: string, event: MatDatepickerInputEvent<Date>): void
    {
        this.dateValue = dayjs(event.value).format(this.format);
    }

    // initialize the value.
    writeValue(value: any): void
    {
        if (value !== undefined)
        {
            this.dateValue = dayjs(value).format(this.format);
        }
    }

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    propagateChange = (_: any) => { /**/ };

    // registers a callback function is called by the forms API on initialization
    // to update the form model on blur.
    registerOnChange(fn): void
    {
        this.propagateChange = fn;
    }

    registerOnTouched(): void
    { /**/ }
}
