import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
    selector       : 'error-500',
    templateUrl    : './error-500.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports        : [
        RouterModule, TranslocoModule,
    ],
})
export class Error500Component { }
