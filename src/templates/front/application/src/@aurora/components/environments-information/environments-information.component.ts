import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { EnvironmentsInformationService } from './environments-information.service';
import { EnvironmentsInformation } from './environments-information.types';

@Component({
    selector       : 'au-environments-information',
    templateUrl    : './environments-information.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs       : 'auEnvironmentsInformation',
    standalone     : true,
})
export class EnvironmentsInformationComponent
{
    environmentsInformation: EnvironmentsInformation;

    constructor(
        private environmentsInformationService: EnvironmentsInformationService,
        private changeDetection: ChangeDetectorRef,
    )
    { }

    ngOnInit(): void
    {
        this.environmentsInformationService
            .environmentsInformation$
            .subscribe(environmentsInformation =>
            {
                this.environmentsInformation = environmentsInformation;
                this.changeDetection.markForCheck();
            });
    }
}
