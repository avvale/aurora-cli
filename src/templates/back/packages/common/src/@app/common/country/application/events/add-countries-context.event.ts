import { AggregateRoot } from '@nestjs/cqrs';
import { CommonCountry } from '../../domain/country.aggregate';
import { CreatedCountryEvent } from './created-country.event';
import { CreatedCountriesEvent } from './created-countries.event';
import { UpdatedCountryEvent } from './updated-country.event';
import { UpdatedCountriesEvent } from './updated-countries.event';
import { DeletedCountryEvent } from './deleted-country.event';
import { DeletedCountriesEvent } from './deleted-countries.event';

export class AddCountriesContextEvent extends AggregateRoot
{
    constructor(
        public readonly aggregateRoots: CommonCountry[] = [],
    )
    {
        super();
    }

    *[Symbol.iterator]()
    {
        for (const aggregateRoot of this.aggregateRoots) yield aggregateRoot;
    }

    created(): void
    {
        this.apply(
            new CreatedCountriesEvent(
                this.aggregateRoots.map(country =>
                    new CreatedCountryEvent(
                        country.id.value,
                        country.iso3166Alpha2.value,
                        country.iso3166Alpha3.value,
                        country.iso3166Numeric.value,
                        country.customCode?.value,
                        country.prefix?.value,
                        country.image?.value,
                        country.sort?.value,
                        country.administrativeAreas?.value,
                        country.latitude?.value,
                        country.longitude?.value,
                        country.zoom?.value,
                        country.mapType.value,
                        country.availableLangs?.value,
                        country.createdAt?.value,
                        country.updatedAt?.value,
                        country.deletedAt?.value,
                        country.langId.value,
                        country.name.value,
                        country.slug.value,
                        country.administrativeAreaLevel1?.value,
                        country.administrativeAreaLevel2?.value,
                        country.administrativeAreaLevel3?.value,
                    ),
                ),
            ),
        );
    }

    updated(): void
    {
        this.apply(
            new UpdatedCountriesEvent(
                this.aggregateRoots.map(country =>
                    new UpdatedCountryEvent(
                        country.id.value,
                        country.iso3166Alpha2.value,
                        country.iso3166Alpha3.value,
                        country.iso3166Numeric.value,
                        country.customCode?.value,
                        country.prefix?.value,
                        country.image?.value,
                        country.sort?.value,
                        country.administrativeAreas?.value,
                        country.latitude?.value,
                        country.longitude?.value,
                        country.zoom?.value,
                        country.mapType.value,
                        country.availableLangs?.value,
                        country.createdAt?.value,
                        country.updatedAt?.value,
                        country.deletedAt?.value,
                        country.langId.value,
                        country.name.value,
                        country.slug.value,
                        country.administrativeAreaLevel1?.value,
                        country.administrativeAreaLevel2?.value,
                        country.administrativeAreaLevel3?.value,
                    ),
                ),
            ),
        );
    }

    deleted(): void
    {
        this.apply(
            new DeletedCountriesEvent(
                this.aggregateRoots.map(country =>
                    new DeletedCountryEvent(
                        country.id.value,
                        country.iso3166Alpha2.value,
                        country.iso3166Alpha3.value,
                        country.iso3166Numeric.value,
                        country.customCode?.value,
                        country.prefix?.value,
                        country.image?.value,
                        country.sort?.value,
                        country.administrativeAreas?.value,
                        country.latitude?.value,
                        country.longitude?.value,
                        country.zoom?.value,
                        country.mapType.value,
                        country.availableLangs?.value,
                        country.createdAt?.value,
                        country.updatedAt?.value,
                        country.deletedAt?.value,
                        country.langId.value,
                        country.name.value,
                        country.slug.value,
                        country.administrativeAreaLevel1?.value,
                        country.administrativeAreaLevel2?.value,
                        country.administrativeAreaLevel3?.value,
                    ),
                ),
            ),
        );
    }
}