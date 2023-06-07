import { UpdatedCountryEvent } from './updated-country.event';

export class UpdatedCountriesEvent
{
    constructor(
        public readonly countries: UpdatedCountryEvent[],
    ) {}
}