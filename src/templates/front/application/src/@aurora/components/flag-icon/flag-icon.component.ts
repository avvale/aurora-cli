import { NgClass, NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'au-flag-icon',
    styles: [`
        :host {
            display: flex;
            align-items: center;
        }
        .fi {
            margin-right: 10px;
        }
        .rounded {
            border-radius: 50% !important;
        }
    `],
    template: `
        @if (flagCode)
        {
            <span
                class="fi fi-{{ flagCode }}"
                [ngClass]="{'rounded': rounded}"
                [ngStyle]="{
                    'flag-icon-squared': squared,
                    'rounded': rounded,
                    'font-size': fontSize
                }"
            >
            </span>
            <ng-content></ng-content>

        }
    `,
    imports   : [
        NgClass, NgStyle,
    ],
})

export class FlagIconComponent
{
    @Input() squared = false;
    @Input() rounded = false;
    @Input() flagCode: string;
    @Input() fontSize: string;
}
