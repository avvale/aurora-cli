import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { CountryCode, parsePhoneNumberFromString } from 'libphonenumber-js';

export function phoneNumberFormat(
    iso3166Alpha2FormControlName: string,
): ValidatorFn
{
    return (control: AbstractControl): ValidationErrors | null =>
    {
        const inputPhoneNumber = control.value?.toString();

        if (!inputPhoneNumber) return null;

        const phoneNumber = parsePhoneNumberFromString(
            inputPhoneNumber,
            control.parent.get(iso3166Alpha2FormControlName).value as CountryCode,
        );

        return phoneNumber?.isValid() ? null : { phoneNumberFormat: true };
    };
}
