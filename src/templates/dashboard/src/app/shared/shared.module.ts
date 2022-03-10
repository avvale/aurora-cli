import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbModule, MaterialGridModule, TitleModule } from '@aurora';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        // @aurora
        BreadcrumbModule,
        MaterialGridModule,
        TitleModule,
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        // @aurora
        BreadcrumbModule,
        MaterialGridModule,
        TitleModule,
    ],
})
export class SharedModule {}
