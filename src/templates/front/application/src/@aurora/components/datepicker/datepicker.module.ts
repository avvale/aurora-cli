import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DatepickerComponent } from './datepicker.component';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';

@NgModule({
    declarations: [
        DatepickerComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
    ],
    exports: [
        DatepickerComponent,
    ],
    providers: [
        {
            provide : ErrorStateMatcher,
            useClass: ShowOnDirtyErrorStateMatcher,
        },
    ],
})
export class DatepickerModule {}
