import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
    selector: 'error-404',
    templateUrl: './error-404.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        RouterModule, TranslocoModule,
    ],
})
export class Error404Component { }
