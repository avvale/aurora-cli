import { ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, Input, Output, QueryList, ViewChild, WritableSignal, forwardRef, signal } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import parsePhoneNumberFromString, { CountryCode } from 'libphonenumber-js';
import { FlagIconComponent } from '../../flag-icon';
import { GetCountryPrefixPipe } from '../get-country-prefix.pipe';
import { CountryPrefixOption } from '../phone-number-format.types';
import { OptionCountryPrefixComponent } from './option-country-prefix.component';
import { LowerCasePipe } from '@angular/common';

@Component({
    selector   : 'au-select-country-prefix',
    templateUrl: './select-country-prefix.component.html',
    providers  : [
        {
            provide    : NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SelectCountryPrefixComponent),
            multi      : true,
        },
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone     : true,
    imports        : [
        FlagIconComponent,
        GetCountryPrefixPipe,
        LowerCasePipe,
        MatSelectModule,
        ReactiveFormsModule,
    ],
})
export class SelectCountryPrefixComponent implements ControlValueAccessor
{
    @Input() phoneNumberInput: HTMLInputElement;
    @Output() phoneNumberSanitized = new EventEmitter<string>();

    @ViewChild(MatSelect) selectCountries: MatSelect;
    @ContentChildren(OptionCountryPrefixComponent) optionCountryPrefixComponents?: QueryList<OptionCountryPrefixComponent>;

    options: WritableSignal<Set<CountryPrefixOption>> = signal(new Set());
    internalControl = new FormControl();

    ngOnInit(): void
    {
        // listen to changes in mat-select of country prefixes
        this.internalControl
            .valueChanges
            .subscribe(() =>
            {
                this.setPhoneNumberSanitized(
                    this.phoneNumberInput.value,
                    this.internalControl.value,
                );
            });

        // listen to changes in phone number input
        this.phoneNumberInput
            .addEventListener('blur', () =>
            {
                this.setPhoneNumberSanitized(
                    this.phoneNumberInput.value,
                    this.internalControl.value,
                );
            });
    }

    private setPhoneNumberSanitized(
        inputPhoneNumber: string,
        iso3166Alpha2: CountryCode,
    ): void
    {
        const phoneNumber = parsePhoneNumberFromString(
            inputPhoneNumber,
            iso3166Alpha2,
        );

        if (phoneNumber?.isValid())
        {
            this.phoneNumberSanitized.emit(phoneNumber.number);
        }
        else
        {
            this.phoneNumberSanitized.emit(null);
        }
    }

    ngAfterViewInit(): void
    {
        // TODO, do not change the language dynamically,
        // you have to log in and out to load the languages.
        const options = new Set<CountryPrefixOption>();
        for (const option of this.optionCountryPrefixComponents)
        {
            options.add({
                iso3166Alpha2: option.iso3166Alpha2,
                prefix       : option.prefix,
                content      : option.content.nativeElement.textContent.trim(),
            });
        }

        // set signal value to throw change
        // detection and draw mat-option elements
        this.options.set(options);
    }

    // ControlValueAccessor methods
    writeValue(countryCode: CountryCode): void
    {
        this.internalControl
            .setValue(countryCode);
    }

    registerOnChange(fn: () => void): void
    {
        this.internalControl
            .valueChanges
            .subscribe(fn);
    }

    registerOnTouched(fn: () => void): void
    {
        // You can implement this method if you need to do anything when the control is "touched"
    }

    setDisabledState?(isDisabled: boolean): void
    {
        isDisabled ?
            this.internalControl.disable() :
            this.internalControl.enable();
    }

    onSelectionChange(event): void
    {
        this.internalControl
            .updateValueAndValidity();
    }
}