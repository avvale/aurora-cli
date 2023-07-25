import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector       : 'au-mat-form-field-appearance',
    templateUrl    : './mat-form-field-appearance.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone     : true,
})
export class MatFormFieldAppearanceComponent
{
    @Input() label: string;
}
