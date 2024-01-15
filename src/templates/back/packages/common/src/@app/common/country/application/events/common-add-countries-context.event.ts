import { CommonCountry, CommonCreatedCountriesEvent, CommonCreatedCountryEvent, CommonDeletedCountriesEvent, CommonDeletedCountryEvent, CommonUpdatedCountriesEvent, CommonUpdatedCountryEvent } from '@app/common/country';
import { AggregateRoot } from '@nestjs/cqrs';

export class CommonAddCountriesContextEvent extends AggregateRoot
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
            new CommonCreatedCountriesEvent(
                this.aggregateRoots.map(country =>
                    new CommonCreatedCountryEvent(
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
                        country.mapType?.value,
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
            new CommonUpdatedCountriesEvent(
                this.aggregateRoots.map(country =>
                    new CommonUpdatedCountryEvent(
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
                        country.mapType?.value,
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
            new CommonDeletedCountriesEvent(
                this.aggregateRoots.map(country =>
                    new CommonDeletedCountryEvent(
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
                        country.mapType?.value,
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
