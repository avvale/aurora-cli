/**
 * @aurora-generated
 * @source cliter/common/country.aurora.yaml
 */
import {
  CommonCountry,
  CommonCreatedCountriesEvent,
  CommonCreatedCountryEvent,
} from '@app/common/country';
import { CQMetadata } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

export class CommonAddCountriesContextEvent extends AggregateRoot {
  constructor(
    public readonly aggregateRoots: CommonCountry[] = [],
    public readonly cQMetadata?: CQMetadata,
  ) {
    super();
  }

  *[Symbol.iterator]() {
    for (const aggregateRoot of this.aggregateRoots) yield aggregateRoot;
  }

  created(): void {
    this.apply(
      new CommonCreatedCountriesEvent({
        payload: this.aggregateRoots.map(
          (country) =>
            new CommonCreatedCountryEvent({
              payload: {
                id: country.id.value,
                iso3166Alpha2: country.iso3166Alpha2.value,
                iso3166Alpha3: country.iso3166Alpha3.value,
                iso3166Numeric: country.iso3166Numeric.value,
                customCode: country.customCode?.value,
                prefix: country.prefix?.value,
                image: country.image?.value,
                sort: country.sort?.value,
                administrativeAreas: country.administrativeAreas?.value,
                latitude: country.latitude?.value,
                longitude: country.longitude?.value,
                zoom: country.zoom?.value,
                mapType: country.mapType?.value,
                availableLangs: country.availableLangs?.value,
                createdAt: country.createdAt?.value,
                updatedAt: country.updatedAt?.value,
                deletedAt: country.deletedAt?.value,
                langId: country.langId.value,
                name: country.name.value,
                slug: country.slug.value,
                administrativeAreaLevel1:
                  country.administrativeAreaLevel1?.value,
                administrativeAreaLevel2:
                  country.administrativeAreaLevel2?.value,
                administrativeAreaLevel3:
                  country.administrativeAreaLevel3?.value,
              },
            }),
        ),
        cQMetadata: this.cQMetadata,
      }),
    );
  }
}
