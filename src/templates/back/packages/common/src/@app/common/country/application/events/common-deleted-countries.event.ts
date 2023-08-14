import { CommonDeletedCountryEvent } from './common-deleted-country.event';

export class CommonDeletedCountriesEvent
{
    constructor(
        public readonly countries: CommonDeletedCountryEvent[],
    ) {}
}
