import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    Input,
    ViewEncapsulation,
} from '@angular/core';

type ChipSize = 'tiny' | 'small' | 'regular';
type ChipPaletteColor = 'primary' | 'accent' | 'warn' | 'success';

@Component({
    selector: 'au-chip',
    templateUrl: './chip.component.html',
    styleUrls: ['./chip.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [CommonModule],
})
export class ChipComponent {
    private readonly paletteColors = new Set<ChipPaletteColor>([
        'primary',
        'accent',
        'warn',
        'success',
    ]);

    @Input('size') size: ChipSize = 'regular';
    @Input('color') color: ChipPaletteColor | string = 'primary';

    get isPaletteColor(): boolean {
        return this.paletteColors.has(this.color as ChipPaletteColor);
    }

    get backgroundStyles(): Record<string, string> | null {
        const backgroundColor = this.isPaletteColor ? null : this.color;

        return backgroundColor ? { 'background-color': backgroundColor } : null;
    }
}
