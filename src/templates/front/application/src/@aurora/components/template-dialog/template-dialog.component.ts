import { Component, Inject, TemplateRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'au-template-dialog',
    template: `
        <ng-container [ngTemplateOutlet]="data.template"></ng-container>
    `,
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