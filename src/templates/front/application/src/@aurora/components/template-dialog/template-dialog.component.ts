import { NgTemplateOutlet } from '@angular/common';
import { Component, Inject, TemplateRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'au-template-dialog',
    template: `
        <ng-container [ngTemplateOutlet]="data.template"></ng-container>
    `,
    standalone: true,
    imports: [NgTemplateOutlet],
})
export class TemplateDialogComponent<T = undefined>
{
    constructor(
        public dialogRef: MatDialogRef<TemplateDialogComponent<T>>,
        @Inject(MAT_DIALOG_DATA)
        public data: {
            template: TemplateRef<any>;
        },
    ) { }
}