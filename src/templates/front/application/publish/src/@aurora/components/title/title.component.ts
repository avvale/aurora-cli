import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector       : 'au-title',
    templateUrl    : './title.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone     : true,
})
export class TitleComponent
{
}
