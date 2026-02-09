/**
 * @aurora-generated
 * @source cliter/common/country.aurora.yaml
 */
import {
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
export class CommonUpdateCountryByIdService {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: CommonICountryRepository,
    private readonly repositoryI18n: CommonICountryI18nRepository,
  ) {}

  async main(
    payload: {
      id: CommonCountryId;
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
    constraint?: QueryStatement,
    cQMetadata?: CQMetadata,
  ): Promise<void> {
    const contentLanguage = cQMetadata.meta.contentLanguage;

    // override langId value object with header content-language value
    payload.langId = new CommonCountryI18nLangId(contentLanguage.id);

    // create aggregate with factory pattern
    const country = CommonCountry.register(
      payload.id,
      undefined, // rowId
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

    // update by id
    await this.repository.updateById(country, {
      constraint,
      cQMetadata,
      updateByIdOptions: cQMetadata?.repositoryOptions,
    });

    await this.repositoryI18n.updateById(country, {
      constraint,
      cQMetadata,
      updateByIdOptions: cQMetadata?.repositoryOptions,
      dataFactory: (aggregate: CommonCountry) => aggregate.toI18nRepository(),
      findArguments: {
        langId: contentLanguage.id,
        countryId: country.id.value,
      },
    });

    // merge EventBus methods with object returned by the repository, to be able to apply and commit events
    const countryRegister = this.publisher.mergeObjectContext(country);

    countryRegister.updated({
      payload: country,
      cQMetadata,
    }); // apply event to model events
    countryRegister.commit(); // commit all events of model
  }
}
