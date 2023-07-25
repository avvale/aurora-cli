import { Directive, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import * as dayjs from 'dayjs';

@Directive({
    selector: '[auDatepickerSqlFormat]',
    standalone: true,
})
export class DatepickerSqlFormatDirective
{
    @Input() format: string = 'YYYY-MM-DD';

    constructor(
        private control: NgControl,
    ) {}

    @HostListener('dateChange', ['$event'])
    onDateChange($event: MatDatepickerInputEvent<Date>): void
    {
        this.control
            .control
            .setValue(
                $event.value === null ?
                    null
                    : dayjs($event.value).format(this.format),
            );
    }
}