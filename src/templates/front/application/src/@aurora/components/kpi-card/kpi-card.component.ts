import { ChangeDetectionStrategy, Component, ContentChild, input, output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { KPICardHeaderLeftDirective } from './directive/kpi-card-header-left.directive';
import { KPICardHeaderRightDirective } from './directive/kpi-card-header-right.directive';

@Component({
    selector: 'au-kpi-card-component',
    templateUrl: './kpi-card.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CommonModule, MatIconModule],
})
export class KPICardComponent {

    count = input<number>(0);
    title = input<string>('');
    text = input<string>('');
    subtext = input<string>('');
    color = input<string>('#000000');
    onKPIClick = output<void>();

    @ContentChild(KPICardHeaderLeftDirective) kpiCardHeaderLeft ? : KPICardHeaderLeftDirective;
    @ContentChild(KPICardHeaderRightDirective) kpiCardHeaderRight? : KPICardHeaderRightDirective;

    kpiClickHandler(): void
    {
        this.onKPIClick.emit();
    }
}
