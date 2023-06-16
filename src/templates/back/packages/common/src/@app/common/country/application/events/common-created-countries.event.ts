import { CommonCreatedCountryEvent } from './common-created-country.event';

export class CommonCreatedCountriesEvent
{
    constructor(
        public readonly countries: CommonCreatedCountryEvent[],
    ) {}
}