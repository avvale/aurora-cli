import { NgModule } from '@angular/core';
import { DecimalDirective } from './decimal.directive';

@NgModule({
    declarations: [
        DecimalDirective,
    ],
    exports: [
        DecimalDirective,
    ],
})
export class DecimalModule { }