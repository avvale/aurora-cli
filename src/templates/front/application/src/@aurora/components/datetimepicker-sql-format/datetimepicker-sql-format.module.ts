import { NgModule } from '@angular/core';
import { DatetimepickerSqlFormatDirective } from './datetimepicker-sql-format.directive';

@NgModule({
    declarations: [
        DatetimepickerSqlFormatDirective,
    ],
    exports: [
        DatetimepickerSqlFormatDirective,
    ],
})
export class DatetimepickerSqlFormatModule { }