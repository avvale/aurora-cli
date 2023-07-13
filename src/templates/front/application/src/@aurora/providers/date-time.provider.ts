import { EnvironmentProviders, Provider } from '@angular/core';

import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { DatePickerDayjsAdapter } from '@aurora/components/date-adapters/datepicker-dayjs-adapter';
import { DatePickerDayjsFormats } from '@aurora/components/date-adapters/datepicker-dayjs-formats';

export const provideDateTimeFormat = (): Array<Provider | EnvironmentProviders> =>
{
    return [
        {
            provide : MAT_DATE_FORMATS,
            useValue: DatePickerDayjsFormats,
        },
    ];
};

export const provideDateTimeLocale = (): Array<Provider | EnvironmentProviders> =>
{
    return [
        {
            provide : MAT_DATE_LOCALE,
            useValue: 'es-ES',
        },
        {
            provide : DateAdapter,
            useClass: DatePickerDayjsAdapter,
            deps    : [MAT_DATE_LOCALE],
        },
    ];
};
