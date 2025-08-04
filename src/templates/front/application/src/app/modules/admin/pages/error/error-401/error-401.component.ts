import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
    selector: 'error-401',
    templateUrl: './error-401.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        RouterModule, TranslocoModule,
    ],
})
export class Error401Component { }
