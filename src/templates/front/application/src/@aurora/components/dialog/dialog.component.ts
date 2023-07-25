import { ChangeDetectionStrategy, Component, Inject, TemplateRef, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector       : 'au-dialog',
    templateUrl    : './dialog.component.html',
    styleUrls      : ['./dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation  : ViewEncapsulation.None,
    standalone     : true,
})
export class DialogComponent
{
    constructor(
        public dialogRef: MatDialogRef<DialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: {
            title: string;
            icon: string;
            svgIcon: string;
            currentActionId: string;
            content: TemplateRef<any>;
            headerActions?: TemplateRef<any>;
            footerActions?: TemplateRef<any>;
        },
    ) { }
}
