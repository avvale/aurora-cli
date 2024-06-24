import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { GetCountryPrefixPipe } from '../get-country-prefix.pipe';
import { FlagIconComponent } from '../../flag-icon';

@Component({
    selector: 'au-option-country-prefix',
    template: `
        <div #contentWrapper>
            <ng-content></ng-content>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone     : true,
    imports        : [
        MatSelectModule,
        ReactiveFormsModule,
        GetCountryPrefixPipe,
        FlagIconComponent,
    ],
})
export class OptionCountryPrefixComponent
{
    @Input() iso3166Alpha2: string;
    @Input() prefix: string;
    @ViewChild('contentWrapper') content: ElementRef;
}