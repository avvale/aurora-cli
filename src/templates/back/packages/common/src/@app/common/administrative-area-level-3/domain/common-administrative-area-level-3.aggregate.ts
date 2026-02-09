/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-3.aurora.yaml
 */
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
  CommonAdministrativeAreaLevel3RowId,
  CommonAdministrativeAreaLevel3Slug,
  CommonAdministrativeAreaLevel3UpdatedAt,
  CommonAdministrativeAreaLevel3Zoom,
} from '@app/common/administrative-area-level-3/domain/value-objects';
import { CommonCountry } from '@app/common/country';
import { CQMetadata, LiteralObject } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

export class CommonAdministrativeAreaLevel3 extends AggregateRoot {
  id: CommonAdministrativeAreaLevel3Id;
  rowId: CommonAdministrativeAreaLevel3RowId;
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
    rowId: CommonAdministrativeAreaLevel3RowId,
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
    this.rowId = rowId;
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
    rowId: CommonAdministrativeAreaLevel3RowId,
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
      rowId,
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

  created(event: {
    payload: CommonAdministrativeAreaLevel3;
    cQMetadata?: CQMetadata;
  }): void {
    this.apply(
      new CommonCreatedAdministrativeAreaLevel3Event({
        payload: {
          id: event.payload.id.value,
          countryId: event.payload.countryId.value,
          administrativeAreaLevel1Id:
            event.payload.administrativeAreaLevel1Id.value,
          administrativeAreaLevel2Id:
            event.payload.administrativeAreaLevel2Id.value,
          code: event.payload.code.value,
          customCode: event.payload.customCode?.value,
          name: event.payload.name.value,
          slug: event.payload.slug.value,
          latitude: event.payload.latitude?.value,
          longitude: event.payload.longitude?.value,
          zoom: event.payload.zoom?.value,
          mapType: event.payload.mapType?.value,
          createdAt: event.payload.createdAt?.value,
          updatedAt: event.payload.updatedAt?.value,
          deletedAt: event.payload.deletedAt?.value,
        },
        cQMetadata: event.cQMetadata,
      }),
    );
  }

  updated(event: {
    payload: CommonAdministrativeAreaLevel3;
    cQMetadata?: CQMetadata;
  }): void {
    this.apply(
      new CommonUpdatedAdministrativeAreaLevel3Event({
        payload: {
          id: event.payload.id?.value,
          countryId: event.payload.countryId?.value,
          administrativeAreaLevel1Id:
            event.payload.administrativeAreaLevel1Id?.value,
          administrativeAreaLevel2Id:
            event.payload.administrativeAreaLevel2Id?.value,
          code: event.payload.code?.value,
          customCode: event.payload.customCode?.value,
          name: event.payload.name?.value,
          slug: event.payload.slug?.value,
          latitude: event.payload.latitude?.value,
          longitude: event.payload.longitude?.value,
          zoom: event.payload.zoom?.value,
          mapType: event.payload.mapType?.value,
          createdAt: event.payload.createdAt?.value,
          updatedAt: event.payload.updatedAt?.value,
          deletedAt: event.payload.deletedAt?.value,
        },
        cQMetadata: event.cQMetadata,
      }),
    );
  }

  deleted(event: {
    payload: CommonAdministrativeAreaLevel3;
    cQMetadata?: CQMetadata;
  }): void {
    this.apply(
      new CommonDeletedAdministrativeAreaLevel3Event({
        payload: {
          id: event.payload.id.value,
          rowId: event.payload.rowId.value,
          countryId: event.payload.countryId.value,
          administrativeAreaLevel1Id:
            event.payload.administrativeAreaLevel1Id.value,
          administrativeAreaLevel2Id:
            event.payload.administrativeAreaLevel2Id.value,
          code: event.payload.code.value,
          customCode: event.payload.customCode?.value,
          name: event.payload.name.value,
          slug: event.payload.slug.value,
          latitude: event.payload.latitude?.value,
          longitude: event.payload.longitude?.value,
          zoom: event.payload.zoom?.value,
          mapType: event.payload.mapType?.value,
          createdAt: event.payload.createdAt?.value,
          updatedAt: event.payload.updatedAt?.value,
          deletedAt: event.payload.deletedAt?.value,
        },
        cQMetadata: event.cQMetadata,
      }),
    );
  }

  toDTO(): LiteralObject {
    return {
      id: this.id.value,
      rowId: this.rowId.value,
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
      country: this.country?.toRepository(),
      administrativeAreaLevel1: this.administrativeAreaLevel1?.toRepository(),
      administrativeAreaLevel2: this.administrativeAreaLevel2?.toRepository(),
    };
  }
}
