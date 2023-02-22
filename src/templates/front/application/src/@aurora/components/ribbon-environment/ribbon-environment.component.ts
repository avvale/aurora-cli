import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector       : 'au-ribbon-environment',
    templateUrl    : './ribbon-environment.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation  : ViewEncapsulation.None,
})
export class RibbonEnvironmentComponent
{
    @Input() title: string = '';
}
