import { NgModule } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatSelectAddSelectedDirective, ScrollEndDirective } from '@aurora/directives';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

@NgModule({
    imports: [
        MatDividerModule,
        MatSelectAddSelectedDirective,
        MatSelectModule,
        ScrollEndDirective,
        NgxMatSelectSearchModule,
    ],
    exports: [
        MatDividerModule,
        MatSelectAddSelectedDirective,
        MatSelectModule,
        ScrollEndDirective,
        NgxMatSelectSearchModule,
    ],
})
export class AsyncMatSelectSearchModule { }
