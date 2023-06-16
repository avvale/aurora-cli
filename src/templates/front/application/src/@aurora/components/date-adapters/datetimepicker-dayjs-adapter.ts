import { DatetimeAdapter, MtxDatetimeFormats, MTX_DATETIME_FORMATS } from '@ng-matero/extensions/core';
import * as dayjs from 'dayjs';
import * as arraySupport from 'dayjs/plugin/arraySupport';
import 'dayjs/locale/es';
dayjs.extend(arraySupport);
import { type Dayjs } from 'dayjs';
import { Optional, Inject, Injectable } from '@angular/core';
import { MAT_DATE_LOCALE, DateAdapter } from '@angular/material/core';

/** The default hour names to use if Intl API is not available. */
const DEFAULT_HOUR_NAMES = range(24, i => String(i));

/** The default minute names to use if Intl API is not available. */
const DEFAULT_MINUTE_NAMES = range(60, i => String(i));

function range<T>(length: number, valueFunction: (index: number) => T): T[]
{
    const valuesArray = Array(length);
    for (let i = 0; i < length; i++)
    {
        valuesArray[i] = valueFunction(i);
    }
    return valuesArray;
}

@Injectable()
export class DateTimePickerDayjsAdapter extends DatetimeAdapter<Dayjs>
{
    constructor(
        @Optional() @Inject(MAT_DATE_LOCALE) matDateLocale: string,
        @Optional() @Inject(MTX_DATETIME_FORMATS) private dateFormats: MtxDatetimeFormats,
        _delegate: DateAdapter<Dayjs>,
    )
    {
        super(_delegate);
        this.setLocale(matDateLocale);
    }

    parse(value: any): Dayjs | null
    {
        return dayjs(value, this.dateFormats.parse.datetimeInput);
    }

    // change format value on display, display format come from MAT_DATE_FORMATS
    format(date: Dayjs, displayFormat: string): string
    {
        return dayjs(date).format(displayFormat);
    }

    getFirstDayOfWeek(): number
    {
        return 1;
    }

    isDayJsInstance(obj: any): boolean
    {
        return obj instanceof dayjs;
    }

    getYearName(date: Dayjs): string
    {
        return date.clone().format('YYYY');
    }

    createDate(year: number, month: number, date: number): Dayjs
    {
        return dayjs([year, month, date]);
    }

    today(): Dayjs
    {
        return dayjs();
    }

    clone(date: Dayjs): Dayjs
    {
        return date.clone();
    }

    getYear(date: Dayjs): number
    {
        return date.year();
    }

    getMonth(date: Dayjs): number
    {
        return date.month();
    }

    getDate(date: Dayjs): number
    {
        return date.date();
    }

    getHour(date: Dayjs): number
    {
        return date.hour();
    }

    getMinute(date: Dayjs): number
    {
        return date.minute();
    }

    isInNextMonth(startDate: Dayjs, endDate: Dayjs): boolean
    {
        const nextMonth = this.getDateInNextMonth(startDate);
        return this.sameMonthAndYear(nextMonth, endDate);
    }

    createDatetime(year: number, month: number, date: number, hour: number, minute: number): Dayjs
    {
        // Check for invalid month and date (except upper bound on date which we have to check after
        // creating the Dayjs).
        if (month < 0 || month > 11)
        {
            throw new Error(`Invalid month index "${month}". Month index has to be between 0 and 11.`);
        }

        if (date < 1)
        {
            throw new Error(`Invalid date "${date}". Date has to be greater than 0.`);
        }

        if (hour < 0 || hour > 23)
        {
            throw new Error(`Invalid hour "${hour}". Hour has to be between 0 and 23.`);
        }

        if (minute < 0 || minute > 59)
        {
            throw new Error(`Invalid minute "${minute}". Minute has to be between 0 and 59.`);
        }

        //const result = this._createDateWithOverflow(year, month, date, hour, minute);
        const result = dayjs([year, month, date, hour, minute]);

        // Check that the date wasn't above the upper bound for the month, causing the month to overflow
        if (result.month() !== month)
        {
            throw new Error(`Invalid date "${date}" for month with index "${month}".`);
        }

        return result;
    }

    getFirstDateOfMonth(date: Dayjs): Dayjs
    {
        return date.clone().startOf('month');
    }

    getHourNames(): string[]
    {
        return DEFAULT_HOUR_NAMES;
    }

    getMinuteNames(): string[]
    {
        return DEFAULT_MINUTE_NAMES;
    }

    addCalendarYears(date: Dayjs, years: number): Dayjs
    {
        return date.clone().add(years, 'years');
    }

    addCalendarMonths(date: Dayjs, months: number): Dayjs
    {
        return date.clone().add(months, 'months');
    }

    addCalendarDays(date: Dayjs, days: number): Dayjs
    {
        return date.clone().add(days, 'days');
    }

    addCalendarHours(date: Dayjs, hours: number): Dayjs
    {
        return date.clone().add(hours, 'hours');
    }

    addCalendarMinutes(date: Dayjs, minutes: number): Dayjs
    {
        return date.clone().add(minutes, 'minutes');
    }

    toIso8601(date: Dayjs): string
    {
        return date.toISOString();
    }

    isValid(date: Dayjs): boolean
    {
        if (!(date instanceof dayjs)) return false;
        return date.isValid();
    }

    deserialize(value: any): Dayjs | null
    {
        if (typeof value === 'string')
        {
            if (!value) return null;
            return dayjs(value); // set string in ISO 8601 format
        }

        if (value == null || (this.isDayJsInstance(value) && this.isValid(value)))
        {
            return value;
        }
        return this.invalid();
    }

    getValidDateOrNull(obj: any): Dayjs | null
    {
        return this.isDayJsInstance(obj) && this.isValid(obj) ? obj : null;
    }

    private getDateInNextMonth(date: Dayjs): Dayjs
    {
        return date.clone().date(1).add(1, 'month');
    }
}
