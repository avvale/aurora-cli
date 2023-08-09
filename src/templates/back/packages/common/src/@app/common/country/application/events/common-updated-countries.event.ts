import { CommonUpdatedCountryEvent } from './common-updated-country.event';

export class CommonUpdatedCountriesEvent
{
    constructor(
        public readonly countries: CommonUpdatedCountryEvent[],
    ) {}
}
