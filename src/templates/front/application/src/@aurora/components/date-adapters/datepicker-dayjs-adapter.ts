import { Inject, Optional } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { MatDateFormats, MAT_DATE_FORMATS, NativeDateAdapter } from '@angular/material/core';
import * as dayjs from 'dayjs';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';
import * as localizedFormat from 'dayjs/plugin/localizedFormat';
import * as locale from 'dayjs/locale/es';

/*
TODO, crear carga dinámica de idiomas para las Fechas
const locales = {
    es: () => import('dayjs/locale/es'),
    de: () => import('dayjs/locale/de'),
    en: () => import('dayjs/locale/en'),
}

  function loadLocale (language) {
    locales[language]().then(() => dayjs.locale(language))
  } */

export class DatePickerDayjsAdapter extends NativeDateAdapter
{
    constructor(
        matDateLocale: string,
        platform: Platform,
        @Optional() @Inject(MAT_DATE_FORMATS) private dateFormats: MatDateFormats,
    )
    {
        super(matDateLocale, platform);

        dayjs.locale('es');
        dayjs.extend(customParseFormat);
        dayjs.extend(localizedFormat);
    }

    parse(value: any): Date | null
    {
        if (!value) return null;
        return dayjs(value, this.dateFormats.parse.dateInput).toDate();
    }

    // change format value on display, display format come from MAT_DATE_FORMATS
    format(date: Date, displayFormat: string): string
    {
        return dayjs(date).format(displayFormat);
    }

    getDayOfWeek(date: Date): number
    {
        return dayjs(date).day();
    }

    getFirstDayOfWeek(): number
    {
        return 1;
    }

    getMonth(date: Date): number
    {
        return dayjs(date).month();
    }

    getYear(date: Date): number
    {
        return dayjs(date).year();
    }
}
