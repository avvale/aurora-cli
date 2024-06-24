import { Pipe, PipeTransform } from '@angular/core';
import { CountryPrefixOption } from './phone-number-format.types';

@Pipe({
    name      : 'getCountryPrefix',
    pure      : true,
    standalone: true,
})
export class GetCountryPrefixPipe implements PipeTransform
{
    transform(countryPrefixOptions: CountryPrefixOption[], iso3166Alpha2: string): CountryPrefixOption
    {
        return [...countryPrefixOptions].find(countryPrefixOption => countryPrefixOption.iso3166Alpha2 === iso3166Alpha2);
    }
}
