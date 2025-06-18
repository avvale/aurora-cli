import { Component, Input, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector     : 'mat-pass-toggle-visibility',
    templateUrl  : './mat-pass-toggle-visibility.component.html',
    styleUrls    : ['./mat-pass-toggle-visibility.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone   : true,
    imports      : [
        MatButtonModule, MatIconModule, MatRippleModule,
    ],
})
export class MatPassToggleVisibilityComponent
{
    @Input() isVisible: boolean;
    @Input() tabindex?: string;

    get type(): string
    {
        return this.isVisible ? 'text' : 'password';
    }

}
