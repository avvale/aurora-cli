import { NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Appearance, CoreLang } from '@aurora';

@Component({
    selector: 'au-flag-lang',
    template: `
        <mat-form-field
            [appearance]="appearance"
            [attr.tiny]="tiny"
            [attr.small]="small"
            class="flex"
        >
            <mat-label>{{ label }}</mat-label>
            <span matPrefix>
                <span
                    class="ml-4 fi fi-{{ lang.image }}"
                    [ngStyle]="{
                        'flag-icon-squared': true,
                        'rounded': false,
                        'font-size': '15px'
                    }"
                >
                </span>
            </span>
            <input
                matInput
                class="ml-1"
                [value]="lang.name"
                [readonly]="true"
            >
        </mat-form-field>
    `,
    standalone: true,
    imports: [
        FormsModule, MatFormFieldModule, MatInputModule, NgStyle,
    ],
})
export class FlagLangComponent
{
    @Input() appearance: Appearance = 'legacy'; // 'legacy' | 'standard' | 'fill' | 'outline'
    @Input() label: string;
    @Input() lang: CoreLang;
    @Input() error: string;
    @Input() tiny: boolean;
    @Input() small: boolean;
}
