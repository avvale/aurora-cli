import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GridFormElementDetailDialogTemplateDirective } from './directives/grid-form-element-detail-dialog-template.directive';

@Component({
    selector       : 'au-grid-element-detail-dialog',
    templateUrl    : './grid-element-detail-dialog.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridElementDetailDialogComponent
{
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: {
            title: string;
            icon: string;
            svgIcon: string;
            currentActionId: string;
            gridFormElementDetailDialogTemplate?: GridFormElementDetailDialogTemplateDirective;
        },
        public dialogRef: MatDialogRef<GridElementDetailDialogComponent>,
    ) { }
}
