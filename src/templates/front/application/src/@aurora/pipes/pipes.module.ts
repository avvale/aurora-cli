import { NgModule } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { GetPipe } from './get.pipe';

@NgModule({
    declarations: [
        GetPipe,
    ],
    providers: [
        DecimalPipe,
    ],
    exports: [
        GetPipe,
    ],
})
export class PipesModule { }