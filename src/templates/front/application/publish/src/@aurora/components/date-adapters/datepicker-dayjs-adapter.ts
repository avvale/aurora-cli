import { Inject, Optional } from '@angular/core';
import {
    MAT_DATE_FORMATS,
    MatDateFormats,
    NativeDateAdapter,
} from '@angular/material/core';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import localizedFormat from 'dayjs/plugin/localizedFormat';

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

export class DatePickerDayjsAdapter extends NativeDateAdapter {
    constructor(
        matDateLocale: string,
        @Optional()
        @Inject(MAT_DATE_FORMATS)
        private dateFormats: MatDateFormats
    ) {
        super(matDateLocale);

        dayjs.locale('es');
        dayjs.extend(customParseFormat);
        dayjs.extend(localizedFormat);
    }

    parse(value: any): Date | null {
        if (!value) return null;
        return dayjs(value, this.dateFormats.parse.dateInput).toDate();
    }

    // change format value on display, display format come from MAT_DATE_FORMATS
    format(date: Date, displayFormat: string): string {
        return dayjs(date).format(displayFormat);
    }

    getDayOfWeek(date: Date): number {
        return dayjs(date).day();
    }

    getFirstDayOfWeek(): number {
        return 1;
    }

    getMonth(date: Date): number {
        return dayjs(date).month();
    }

    getYear(date: Date): number {
        return dayjs(date).year();
    }
}
