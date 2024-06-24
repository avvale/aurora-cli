import { NgModule } from '@angular/core';
import { SelectCountryPrefixComponent } from './component/select-country-prefix.component';
import { OptionCountryPrefixComponent } from './component/option-country-prefix.component';

@NgModule({
    imports: [
        OptionCountryPrefixComponent,
        SelectCountryPrefixComponent,
    ],
    exports: [
        OptionCountryPrefixComponent,
        SelectCountryPrefixComponent,
    ],
})
export class PhoneNumberFormatModule { }
