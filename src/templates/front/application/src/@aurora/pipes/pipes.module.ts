import { NgModule } from '@angular/core';
import { DecimalPipe } from '@angular/common';

// import pipes
import { DateFormatPipe } from './date-format.pipe';
import { GetPipe } from './get.pipe';
import { IsObjectEmptyPipe } from './is-object-empty.pipe';
import { LogPipe } from './log.pipe';
import { SafePipe } from './safe.pipe';
import { SortByPipe } from './sort-by.pipe';
import { GetSessionPipe } from './get-session.pipe';

@NgModule({
    declarations: [
        DateFormatPipe,
        GetPipe,
        GetSessionPipe,
        IsObjectEmptyPipe,
        LogPipe,
        SafePipe,
        SortByPipe,
    ],
    providers: [
        DecimalPipe,
    ],
    exports: [
        DateFormatPipe,
        GetPipe,
        GetSessionPipe,
        IsObjectEmptyPipe,
        LogPipe,
        SafePipe,
        SortByPipe,
    ],
})
export class PipesModule { }