import { NgModule } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { GetPipe } from './get.pipe';
import { SafePipe } from './safe.pipe';

@NgModule({
    declarations: [
        GetPipe,
        SafePipe,
    ],
    providers: [
        DecimalPipe,
    ],
    exports: [
        GetPipe,
        SafePipe,
    ],
})
export class PipesModule { }