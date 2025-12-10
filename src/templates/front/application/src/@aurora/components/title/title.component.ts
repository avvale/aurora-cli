import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'au-title',
    templateUrl: './title.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TitleComponent {}
