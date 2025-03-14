import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

type ChipSize = 'tiny' | 'small' | 'regular';
type ChipColor = 'primary' | 'accent' | 'warn' | 'success';

@Component({
    selector       : 'au-dot',
    templateUrl    : './dot.component.html',
    styleUrls      : ['./dot.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation  : ViewEncapsulation.None,
    standalone     : true,
    imports        : [
        CommonModule,
    ],
})
export class DotComponent
{
    @Input('size') size: ChipSize = 'regular';
    @Input('color') color: string = '#000000';
    @Input('matColor') matColor: ChipColor = 'primary';
}
