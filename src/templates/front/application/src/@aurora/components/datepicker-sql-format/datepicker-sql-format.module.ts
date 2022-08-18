import { NgModule } from '@angular/core';
import { DatepickerSqlFormatDirective } from './datepicker-sql-format.directive';

@NgModule({
    declarations: [
        DatepickerSqlFormatDirective,
    ],
    exports: [
        DatepickerSqlFormatDirective,
    ],
})
export class DatepickerSqlFormatModule { }