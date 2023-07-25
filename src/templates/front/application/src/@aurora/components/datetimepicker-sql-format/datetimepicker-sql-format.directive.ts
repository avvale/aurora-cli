import { Directive, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import * as dayjs from 'dayjs';

@Directive({
    selector: '[auDatetimepickerSqlFormat]',
    standalone: true,
})
export class DatetimepickerSqlFormatDirective
{
    @Input() format: string = 'YYYY-MM-DD HH:mm:ss';

    constructor(
        private control: NgControl,
    ) {}

    @HostListener('dateChange', ['$event'])
    onDateChange($event: MatDatepickerInputEvent<Date>): void
    {
        this.control
            .control
            .setValue(
                dayjs($event.value)
                    .format(this.format),
            );
    }
}