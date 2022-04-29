import { CreatedCountryEvent } from './created-country.event';

export class CreatedCountriesEvent
{
    constructor(
        public readonly countries: CreatedCountryEvent[],
    ) {}
}