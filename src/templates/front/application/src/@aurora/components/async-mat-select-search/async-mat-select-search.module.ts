import { NgModule } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { ScrollEndDirective } from '@aurora/directives';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

@NgModule({
    imports: [
        MatSelectModule,
        ScrollEndDirective,
        NgxMatSelectSearchModule,
    ],
    exports: [
        MatSelectModule,
        ScrollEndDirective,
        NgxMatSelectSearchModule,
    ],
})
export class AsyncMatSelectSearchModule { }
