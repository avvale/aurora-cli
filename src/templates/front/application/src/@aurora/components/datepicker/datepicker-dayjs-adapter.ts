import { Platform } from '@angular/cdk/platform';
import { NativeDateAdapter } from '@angular/material/core';
import * as dayjs from 'dayjs';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';
import * as localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/es';

export class DatePickerDayjsAdapter extends NativeDateAdapter
{
    constructor(matDateLocale: string, platform: Platform)
    {
        super(matDateLocale, platform);

        dayjs.locale('es');
        dayjs.extend(customParseFormat);
        dayjs.extend(localizedFormat);
    }

    parse(value: any): Date | null
    {
        return dayjs(value, 'DD-MM-YYYY').toDate();
    }

    format(date: Date, displayFormat: any): string
    {
        return dayjs(date).format(displayFormat);
    }
}
