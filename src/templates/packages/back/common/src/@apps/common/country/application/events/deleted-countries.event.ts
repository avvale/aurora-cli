import { DeletedCountryEvent } from './deleted-country.event';

export class DeletedCountriesEvent
{
    constructor(
        public readonly countries: DeletedCountryEvent[],
    ) {}
}