import {
  CommonAddCountriesContextEvent,
  CommonCountry,
  CommonICountryI18nRepository,
  CommonICountryRepository,
} from '@app/common/country';
import {
  CommonCountryAdministrativeAreas,
  CommonCountryCustomCode,
  CommonCountryI18nAdministrativeAreaLevel1,
  CommonCountryI18nAdministrativeAreaLevel2,
  CommonCountryI18nAdministrativeAreaLevel3,
  CommonCountryI18nLangId,
  CommonCountryI18nName,
  CommonCountryI18nSlug,
  CommonCountryId,
  CommonCountryImage,
  CommonCountryIso3166Alpha2,
  CommonCountryIso3166Alpha3,
  CommonCountryIso3166Numeric,
  CommonCountryLatitude,
  CommonCountryLongitude,
  CommonCountryMapType,
  CommonCountryPrefix,
  CommonCountrySort,
  CommonCountryUpdatedAt,
  CommonCountryZoom,
} from '@app/common/country/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class CommonUpdateCountriesService {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: CommonICountryRepository,
    private readonly repositoryI18n: CommonICountryI18nRepository,
  ) {}

  async main(
    payload: {
      id?: CommonCountryId;
      iso3166Alpha2?: CommonCountryIso3166Alpha2;
      iso3166Alpha3?: CommonCountryIso3166Alpha3;
      iso3166Numeric?: CommonCountryIso3166Numeric;
      customCode?: CommonCountryCustomCode;
      prefix?: CommonCountryPrefix;
      image?: CommonCountryImage;
      sort?: CommonCountrySort;
      administrativeAreas?: CommonCountryAdministrativeAreas;
      latitude?: CommonCountryLatitude;
      longitude?: CommonCountryLongitude;
      zoom?: CommonCountryZoom;
      mapType?: CommonCountryMapType;
      langId?: CommonCountryI18nLangId;
      name?: CommonCountryI18nName;
      slug?: CommonCountryI18nSlug;
      administrativeAreaLevel1?: CommonCountryI18nAdministrativeAreaLevel1;
      administrativeAreaLevel2?: CommonCountryI18nAdministrativeAreaLevel2;
      administrativeAreaLevel3?: CommonCountryI18nAdministrativeAreaLevel3;
    },
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    cQMetadata?: CQMetadata,
  ): Promise<void> {
    const contentLanguage = cQMetadata.meta.contentLanguage;

    // override langId value object with header content-language value
    payload.langId = new CommonCountryI18nLangId(contentLanguage.id);

    // create aggregate with factory pattern
    const country = CommonCountry.register(
      payload.id,
      payload.iso3166Alpha2,
      payload.iso3166Alpha3,
      payload.iso3166Numeric,
      payload.customCode,
      payload.prefix,
      payload.image,
      payload.sort,
      payload.administrativeAreas,
      payload.latitude,
      payload.longitude,
      payload.zoom,
      payload.mapType,
      null, // availableLangs
      null, // createdAt
      new CommonCountryUpdatedAt({ currentTimestamp: true }),
      null, // deletedAt
      payload.langId,
      payload.name,
      payload.slug,
      payload.administrativeAreaLevel1,
      payload.administrativeAreaLevel2,
      payload.administrativeAreaLevel3,
    );

    // delete availableLangs property to avoid overwrite this value in database
    delete country.availableLangs;

    // update
    await this.repository.update(country, {
      queryStatement,
      constraint,
      cQMetadata,
      updateOptions: cQMetadata?.repositoryOptions,
    });

    await this.repositoryI18n.update(country, {
      queryStatement,
      constraint,
      cQMetadata,
      updateOptions: cQMetadata?.repositoryOptions,
      dataFactory: (aggregate: CommonCountry) => aggregate.toI18nDTO(),
    });

    // get objects to delete
    const countries = await this.repository.get({
      queryStatement,
      constraint,
      cQMetadata,
    });

    // merge EventBus methods with object returned by the repository, to be able to apply and commit events
    const countriesRegister = this.publisher.mergeObjectContext(
      new CommonAddCountriesContextEvent(countries),
    );

    countriesRegister.updated(); // apply event to model events
    countriesRegister.commit(); // commit all events of model
  }
}
