import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

type ChipSize = 'tiny' | 'small' | 'regular';
type ChipColor = 'primary' | 'accent' | 'warn' | 'success';

@Component({
    selector       : 'au-chip',
    templateUrl    : './chip.component.html',
    styleUrls      : ['./chip.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation  : ViewEncapsulation.None,
    standalone     : true,
})
export class ChipComponent
{
    @Input('size') size: ChipSize = 'regular';
    @Input('color') color: ChipColor = 'primary';
}
