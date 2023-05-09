import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector       : 'au-queue-manager',
    templateUrl    : './queue-manager.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QueueManagerComponent
{
    constructor() { /**/ }
}
