import { NgIf, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { GridFormElementDetailDialogTemplateDirective } from './directives/grid-form-element-detail-dialog-template.directive';

@Component({
    selector       : 'au-grid-element-detail-dialog',
    templateUrl    : './grid-element-detail-dialog.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone     : true,
    imports        : [MatButtonModule, MatDialogModule, MatIconModule, NgIf, NgTemplateOutlet],
})
export class GridElementDetailDialogComponent
{
    @Output() afterViewInit = new EventEmitter<void>();

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

    ngAfterViewInit(): void
    {
        this.afterViewInit.emit();
    }
}
