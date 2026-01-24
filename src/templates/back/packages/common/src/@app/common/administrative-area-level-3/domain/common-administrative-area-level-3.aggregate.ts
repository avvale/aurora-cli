/* eslint-disable key-spacing */
import { CommonAdministrativeAreaLevel1 } from '@app/common/administrative-area-level-1';
import { CommonAdministrativeAreaLevel2 } from '@app/common/administrative-area-level-2';
import {
  CommonCreatedAdministrativeAreaLevel3Event,
  CommonDeletedAdministrativeAreaLevel3Event,
  CommonUpdatedAdministrativeAreaLevel3Event,
} from '@app/common/administrative-area-level-3';
import {
  CommonAdministrativeAreaLevel3AdministrativeAreaLevel1Id,
  CommonAdministrativeAreaLevel3AdministrativeAreaLevel2Id,
  CommonAdministrativeAreaLevel3Code,
  CommonAdministrativeAreaLevel3CountryId,
  CommonAdministrativeAreaLevel3CreatedAt,
  CommonAdministrativeAreaLevel3CustomCode,
  CommonAdministrativeAreaLevel3DeletedAt,
  CommonAdministrativeAreaLevel3Id,
  CommonAdministrativeAreaLevel3Latitude,
  CommonAdministrativeAreaLevel3Longitude,
  CommonAdministrativeAreaLevel3MapType,
  CommonAdministrativeAreaLevel3Name,
  CommonAdministrativeAreaLevel3Slug,
  CommonAdministrativeAreaLevel3UpdatedAt,
  CommonAdministrativeAreaLevel3Zoom,
} from '@app/common/administrative-area-level-3/domain/value-objects';
import { CommonCountry } from '@app/common/country';
import { LiteralObject } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

export class CommonAdministrativeAreaLevel3 extends AggregateRoot {
  id: CommonAdministrativeAreaLevel3Id;
  countryId: CommonAdministrativeAreaLevel3CountryId;
  administrativeAreaLevel1Id: CommonAdministrativeAreaLevel3AdministrativeAreaLevel1Id;
  administrativeAreaLevel2Id: CommonAdministrativeAreaLevel3AdministrativeAreaLevel2Id;
  code: CommonAdministrativeAreaLevel3Code;
  customCode: CommonAdministrativeAreaLevel3CustomCode;
  name: CommonAdministrativeAreaLevel3Name;
  slug: CommonAdministrativeAreaLevel3Slug;
  latitude: CommonAdministrativeAreaLevel3Latitude;
  longitude: CommonAdministrativeAreaLevel3Longitude;
  zoom: CommonAdministrativeAreaLevel3Zoom;
  mapType: CommonAdministrativeAreaLevel3MapType;
  createdAt: CommonAdministrativeAreaLevel3CreatedAt;
  updatedAt: CommonAdministrativeAreaLevel3UpdatedAt;
  deletedAt: CommonAdministrativeAreaLevel3DeletedAt;
  country: CommonCountry;
  administrativeAreaLevel1: CommonAdministrativeAreaLevel1;
  administrativeAreaLevel2: CommonAdministrativeAreaLevel2;

  constructor(
    id: CommonAdministrativeAreaLevel3Id,
    countryId: CommonAdministrativeAreaLevel3CountryId,
    administrativeAreaLevel1Id: CommonAdministrativeAreaLevel3AdministrativeAreaLevel1Id,
    administrativeAreaLevel2Id: CommonAdministrativeAreaLevel3AdministrativeAreaLevel2Id,
    code: CommonAdministrativeAreaLevel3Code,
    customCode: CommonAdministrativeAreaLevel3CustomCode,
    name: CommonAdministrativeAreaLevel3Name,
    slug: CommonAdministrativeAreaLevel3Slug,
    latitude: CommonAdministrativeAreaLevel3Latitude,
    longitude: CommonAdministrativeAreaLevel3Longitude,
    zoom: CommonAdministrativeAreaLevel3Zoom,
    mapType: CommonAdministrativeAreaLevel3MapType,
    createdAt: CommonAdministrativeAreaLevel3CreatedAt,
    updatedAt: CommonAdministrativeAreaLevel3UpdatedAt,
    deletedAt: CommonAdministrativeAreaLevel3DeletedAt,
    country?: CommonCountry,
    administrativeAreaLevel1?: CommonAdministrativeAreaLevel1,
    administrativeAreaLevel2?: CommonAdministrativeAreaLevel2,
  ) {
    super();
    this.id = id;
    this.countryId = countryId;
    this.administrativeAreaLevel1Id = administrativeAreaLevel1Id;
    this.administrativeAreaLevel2Id = administrativeAreaLevel2Id;
    this.code = code;
    this.customCode = customCode;
    this.name = name;
    this.slug = slug;
    this.latitude = latitude;
    this.longitude = longitude;
    this.zoom = zoom;
    this.mapType = mapType;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
    this.country = country;
    this.administrativeAreaLevel1 = administrativeAreaLevel1;
    this.administrativeAreaLevel2 = administrativeAreaLevel2;
  }

  static register(
    id: CommonAdministrativeAreaLevel3Id,
    countryId: CommonAdministrativeAreaLevel3CountryId,
    administrativeAreaLevel1Id: CommonAdministrativeAreaLevel3AdministrativeAreaLevel1Id,
    administrativeAreaLevel2Id: CommonAdministrativeAreaLevel3AdministrativeAreaLevel2Id,
    code: CommonAdministrativeAreaLevel3Code,
    customCode: CommonAdministrativeAreaLevel3CustomCode,
    name: CommonAdministrativeAreaLevel3Name,
    slug: CommonAdministrativeAreaLevel3Slug,
    latitude: CommonAdministrativeAreaLevel3Latitude,
    longitude: CommonAdministrativeAreaLevel3Longitude,
    zoom: CommonAdministrativeAreaLevel3Zoom,
    mapType: CommonAdministrativeAreaLevel3MapType,
    createdAt: CommonAdministrativeAreaLevel3CreatedAt,
    updatedAt: CommonAdministrativeAreaLevel3UpdatedAt,
    deletedAt: CommonAdministrativeAreaLevel3DeletedAt,
    country?: CommonCountry,
    administrativeAreaLevel1?: CommonAdministrativeAreaLevel1,
    administrativeAreaLevel2?: CommonAdministrativeAreaLevel2,
  ): CommonAdministrativeAreaLevel3 {
    return new CommonAdministrativeAreaLevel3(
      id,
      countryId,
      administrativeAreaLevel1Id,
      administrativeAreaLevel2Id,
      code,
      customCode,
      name,
      slug,
      latitude,
      longitude,
      zoom,
      mapType,
      createdAt,
      updatedAt,
      deletedAt,
      country,
      administrativeAreaLevel1,
      administrativeAreaLevel2,
    );
  }

  created(administrativeAreaLevel3: CommonAdministrativeAreaLevel3): void {
    this.apply(
      new CommonCreatedAdministrativeAreaLevel3Event(
        administrativeAreaLevel3.id.value,
        administrativeAreaLevel3.countryId.value,
        administrativeAreaLevel3.administrativeAreaLevel1Id.value,
        administrativeAreaLevel3.administrativeAreaLevel2Id.value,
        administrativeAreaLevel3.code.value,
        administrativeAreaLevel3.customCode?.value,
        administrativeAreaLevel3.name.value,
        administrativeAreaLevel3.slug.value,
        administrativeAreaLevel3.latitude?.value,
        administrativeAreaLevel3.longitude?.value,
        administrativeAreaLevel3.zoom?.value,
        administrativeAreaLevel3.mapType?.value,
        administrativeAreaLevel3.createdAt?.value,
        administrativeAreaLevel3.updatedAt?.value,
        administrativeAreaLevel3.deletedAt?.value,
      ),
    );
  }

  updated(administrativeAreaLevel3: CommonAdministrativeAreaLevel3): void {
    this.apply(
      new CommonUpdatedAdministrativeAreaLevel3Event(
        administrativeAreaLevel3.id?.value,
        administrativeAreaLevel3.countryId?.value,
        administrativeAreaLevel3.administrativeAreaLevel1Id?.value,
        administrativeAreaLevel3.administrativeAreaLevel2Id?.value,
        administrativeAreaLevel3.code?.value,
        administrativeAreaLevel3.customCode?.value,
        administrativeAreaLevel3.name?.value,
        administrativeAreaLevel3.slug?.value,
        administrativeAreaLevel3.latitude?.value,
        administrativeAreaLevel3.longitude?.value,
        administrativeAreaLevel3.zoom?.value,
        administrativeAreaLevel3.mapType?.value,
        administrativeAreaLevel3.createdAt?.value,
        administrativeAreaLevel3.updatedAt?.value,
        administrativeAreaLevel3.deletedAt?.value,
      ),
    );
  }

  deleted(administrativeAreaLevel3: CommonAdministrativeAreaLevel3): void {
    this.apply(
      new CommonDeletedAdministrativeAreaLevel3Event(
        administrativeAreaLevel3.id.value,
        administrativeAreaLevel3.countryId.value,
        administrativeAreaLevel3.administrativeAreaLevel1Id.value,
        administrativeAreaLevel3.administrativeAreaLevel2Id.value,
        administrativeAreaLevel3.code.value,
        administrativeAreaLevel3.customCode?.value,
        administrativeAreaLevel3.name.value,
        administrativeAreaLevel3.slug.value,
        administrativeAreaLevel3.latitude?.value,
        administrativeAreaLevel3.longitude?.value,
        administrativeAreaLevel3.zoom?.value,
        administrativeAreaLevel3.mapType?.value,
        administrativeAreaLevel3.createdAt?.value,
        administrativeAreaLevel3.updatedAt?.value,
        administrativeAreaLevel3.deletedAt?.value,
      ),
    );
  }

  toDTO(): LiteralObject {
    return {
      id: this.id.value,
      countryId: this.countryId.value,
      administrativeAreaLevel1Id: this.administrativeAreaLevel1Id.value,
      administrativeAreaLevel2Id: this.administrativeAreaLevel2Id.value,
      code: this.code.value,
      customCode: this.customCode?.value,
      name: this.name.value,
      slug: this.slug.value,
      latitude: this.latitude?.value,
      longitude: this.longitude?.value,
      zoom: this.zoom?.value,
      mapType: this.mapType?.value,
      createdAt: this.createdAt?.value,
      updatedAt: this.updatedAt?.value,
      deletedAt: this.deletedAt?.value,
      country: this.country?.toDTO(),
      administrativeAreaLevel1: this.administrativeAreaLevel1?.toDTO(),
      administrativeAreaLevel2: this.administrativeAreaLevel2?.toDTO(),
    };
  }

  // function called to get data for repository side effect methods
  toRepository(): LiteralObject {
    return {
      id: this.id.value,
      countryId: this.countryId.value,
      administrativeAreaLevel1Id: this.administrativeAreaLevel1Id.value,
      administrativeAreaLevel2Id: this.administrativeAreaLevel2Id.value,
      code: this.code.value,
      customCode: this.customCode?.value,
      name: this.name.value,
      slug: this.slug.value,
      latitude: this.latitude?.value,
      longitude: this.longitude?.value,
      zoom: this.zoom?.value,
      mapType: this.mapType?.value,
      createdAt: this.createdAt?.value,
      updatedAt: this.updatedAt?.value,
      deletedAt: this.deletedAt?.value,
      country: this.country?.toDTO(),
      administrativeAreaLevel1: this.administrativeAreaLevel1?.toDTO(),
      administrativeAreaLevel2: this.administrativeAreaLevel2?.toDTO(),
    };
  }
}
