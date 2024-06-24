import { ChangeDetectionStrategy, Component, ViewEncapsulation, WritableSignal, inject, signal } from '@angular/core';
import { EnvironmentsInformationService } from '../environments-information.service';

@Component({
    selector       : 'au-ribbon-environment',
    templateUrl    : './ribbon-environment.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation  : ViewEncapsulation.None,
    standalone     : true,
})
export class RibbonEnvironmentComponent
{
    title: WritableSignal<string> = signal('Production');
    environmentsInformationService = inject(EnvironmentsInformationService);

    ngOnInit(): void
    {
        this.environmentsInformationService.environmentsInformation$
            .subscribe(environmentsInformation => this.title.set(environmentsInformation.server.environment?.toPascalCase()));
    }
}
