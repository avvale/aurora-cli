import { NgComponentOutlet, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, Type, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ContentDialogTemplateDirective } from './directives/content-dialog-template.directive';
import { ActionsDialogTemplateDirective } from './directives/actions-dialog-template.directive';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector       : 'au-dialog',
    templateUrl    : './dialog.component.html',
    styleUrls      : ['./dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation  : ViewEncapsulation.None,
    imports        : [
        MatButtonModule, MatDialogModule, MatIconModule,
        NgComponentOutlet, NgTemplateOutlet,
    ],
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
            component: Type<unknown>;
            componentInputs: Record<string, unknown>;
            content: ContentDialogTemplateDirective;
            headerActions?: ActionsDialogTemplateDirective;
            footerActions?: ActionsDialogTemplateDirective;
        },
    ) { }

    get componentInputs(): Record<string, unknown>
    {
        return {
            ...(this.data.componentInputs ?? {}),
        };
    }
}
