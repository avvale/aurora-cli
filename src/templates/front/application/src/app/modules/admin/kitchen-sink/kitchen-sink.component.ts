import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector       : 'au-kitchen-sink',
    templateUrl    : './kitchen-sink.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KitchenSinkComponent
{
    constructor() { /**/ }
}
