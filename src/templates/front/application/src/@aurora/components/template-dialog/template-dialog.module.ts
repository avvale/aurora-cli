import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TemplateDialogComponent } from './template-dialog.component';

@NgModule({
    entryComponents: [
        TemplateDialogComponent,
    ],
    imports: [
        CommonModule,
    ],
    declarations: [
        TemplateDialogComponent,
    ],
    exports: [
        TemplateDialogComponent,
    ],
})

export class TemplateDialogModule
{ }
