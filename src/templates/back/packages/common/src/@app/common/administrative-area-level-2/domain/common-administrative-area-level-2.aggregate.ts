/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-2.aurora.yaml
 */
import { CommonAdministrativeAreaLevel1 } from '@app/common/administrative-area-level-1';
import {
  CommonCreatedAdministrativeAreaLevel2Event,
  CommonDeletedAdministrativeAreaLevel2Event,
  CommonUpdatedAdministrativeAreaLevel2Event,
} from '@app/common/administrative-area-level-2';
import {
  CommonAdministrativeAreaLevel2AdministrativeAreaLevel1Id,
  CommonAdministrativeAreaLevel2Code,
  CommonAdministrativeAreaLevel2CountryId,
  CommonAdministrativeAreaLevel2CreatedAt,
  CommonAdministrativeAreaLevel2CustomCode,
  CommonAdministrativeAreaLevel2DeletedAt,
  CommonAdministrativeAreaLevel2Id,
  CommonAdministrativeAreaLevel2Latitude,
  CommonAdministrativeAreaLevel2Longitude,
  CommonAdministrativeAreaLevel2MapType,
  CommonAdministrativeAreaLevel2Name,
  CommonAdministrativeAreaLevel2RowId,
  CommonAdministrativeAreaLevel2Slug,
  CommonAdministrativeAreaLevel2UpdatedAt,
  CommonAdministrativeAreaLevel2Zoom,
} from '@app/common/administrative-area-level-2/domain/value-objects';
import { CommonCountry } from '@app/common/country';
import { CQMetadata, LiteralObject } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

export class CommonAdministrativeAreaLevel2 extends AggregateRoot {
  id: CommonAdministrativeAreaLevel2Id;
  rowId: CommonAdministrativeAreaLevel2RowId;
  countryId: CommonAdministrativeAreaLevel2CountryId;
  administrativeAreaLevel1Id: CommonAdministrativeAreaLevel2AdministrativeAreaLevel1Id;
  code: CommonAdministrativeAreaLevel2Code;
  customCode: CommonAdministrativeAreaLevel2CustomCode;
  name: CommonAdministrativeAreaLevel2Name;
  slug: CommonAdministrativeAreaLevel2Slug;
  latitude: CommonAdministrativeAreaLevel2Latitude;
  longitude: CommonAdministrativeAreaLevel2Longitude;
  zoom: CommonAdministrativeAreaLevel2Zoom;
  mapType: CommonAdministrativeAreaLevel2MapType;
  createdAt: CommonAdministrativeAreaLevel2CreatedAt;
  updatedAt: CommonAdministrativeAreaLevel2UpdatedAt;
  deletedAt: CommonAdministrativeAreaLevel2DeletedAt;
  country: CommonCountry;
  administrativeAreaLevel1: CommonAdministrativeAreaLevel1;

  constructor(
    id: CommonAdministrativeAreaLevel2Id,
    rowId: CommonAdministrativeAreaLevel2RowId,
    countryId: CommonAdministrativeAreaLevel2CountryId,
    administrativeAreaLevel1Id: CommonAdministrativeAreaLevel2AdministrativeAreaLevel1Id,
    code: CommonAdministrativeAreaLevel2Code,
    customCode: CommonAdministrativeAreaLevel2CustomCode,
    name: CommonAdministrativeAreaLevel2Name,
    slug: CommonAdministrativeAreaLevel2Slug,
    latitude: CommonAdministrativeAreaLevel2Latitude,
    longitude: CommonAdministrativeAreaLevel2Longitude,
    zoom: CommonAdministrativeAreaLevel2Zoom,
    mapType: CommonAdministrativeAreaLevel2MapType,
    createdAt: CommonAdministrativeAreaLevel2CreatedAt,
    updatedAt: CommonAdministrativeAreaLevel2UpdatedAt,
    deletedAt: CommonAdministrativeAreaLevel2DeletedAt,
    country?: CommonCountry,
    administrativeAreaLevel1?: CommonAdministrativeAreaLevel1,
  ) {
    super();
    this.id = id;
    this.rowId = rowId;
    this.countryId = countryId;
    this.administrativeAreaLevel1Id = administrativeAreaLevel1Id;
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
  }

  static register(
    id: CommonAdministrativeAreaLevel2Id,
    rowId: CommonAdministrativeAreaLevel2RowId,
    countryId: CommonAdministrativeAreaLevel2CountryId,
    administrativeAreaLevel1Id: CommonAdministrativeAreaLevel2AdministrativeAreaLevel1Id,
    code: CommonAdministrativeAreaLevel2Code,
    customCode: CommonAdministrativeAreaLevel2CustomCode,
    name: CommonAdministrativeAreaLevel2Name,
    slug: CommonAdministrativeAreaLevel2Slug,
    latitude: CommonAdministrativeAreaLevel2Latitude,
    longitude: CommonAdministrativeAreaLevel2Longitude,
    zoom: CommonAdministrativeAreaLevel2Zoom,
    mapType: CommonAdministrativeAreaLevel2MapType,
    createdAt: CommonAdministrativeAreaLevel2CreatedAt,
    updatedAt: CommonAdministrativeAreaLevel2UpdatedAt,
    deletedAt: CommonAdministrativeAreaLevel2DeletedAt,
    country?: CommonCountry,
    administrativeAreaLevel1?: CommonAdministrativeAreaLevel1,
  ): CommonAdministrativeAreaLevel2 {
    return new CommonAdministrativeAreaLevel2(
      id,
      rowId,
      countryId,
      administrativeAreaLevel1Id,
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
    );
  }

  created(event: {
    payload: CommonAdministrativeAreaLevel2;
    cQMetadata?: CQMetadata;
  }): void {
    this.apply(
      new CommonCreatedAdministrativeAreaLevel2Event({
        payload: {
          id: event.payload.id.value,
          countryId: event.payload.countryId.value,
          administrativeAreaLevel1Id:
            event.payload.administrativeAreaLevel1Id.value,
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
    payload: CommonAdministrativeAreaLevel2;
    cQMetadata?: CQMetadata;
  }): void {
    this.apply(
      new CommonUpdatedAdministrativeAreaLevel2Event({
        payload: {
          id: event.payload.id?.value,
          countryId: event.payload.countryId?.value,
          administrativeAreaLevel1Id:
            event.payload.administrativeAreaLevel1Id?.value,
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
    payload: CommonAdministrativeAreaLevel2;
    cQMetadata?: CQMetadata;
  }): void {
    this.apply(
      new CommonDeletedAdministrativeAreaLevel2Event({
        payload: {
          id: event.payload.id.value,
          rowId: event.payload.rowId.value,
          countryId: event.payload.countryId.value,
          administrativeAreaLevel1Id:
            event.payload.administrativeAreaLevel1Id.value,
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
    };
  }

  // function called to get data for repository side effect methods
  toRepository(): LiteralObject {
    return {
      id: this.id.value,
      countryId: this.countryId.value,
      administrativeAreaLevel1Id: this.administrativeAreaLevel1Id.value,
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
    };
  }
}
