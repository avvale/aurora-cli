/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-1.aurora.yaml
 */
import {
  CommonCreatedAdministrativeAreaLevel1Event,
  CommonDeletedAdministrativeAreaLevel1Event,
  CommonUpdatedAdministrativeAreaLevel1Event,
} from '@app/common/administrative-area-level-1';
import {
  CommonAdministrativeAreaLevel1Code,
  CommonAdministrativeAreaLevel1CountryId,
  CommonAdministrativeAreaLevel1CreatedAt,
  CommonAdministrativeAreaLevel1CustomCode,
  CommonAdministrativeAreaLevel1DeletedAt,
  CommonAdministrativeAreaLevel1Id,
  CommonAdministrativeAreaLevel1Latitude,
  CommonAdministrativeAreaLevel1Longitude,
  CommonAdministrativeAreaLevel1MapType,
  CommonAdministrativeAreaLevel1Name,
  CommonAdministrativeAreaLevel1RowId,
  CommonAdministrativeAreaLevel1Slug,
  CommonAdministrativeAreaLevel1UpdatedAt,
  CommonAdministrativeAreaLevel1Zoom,
} from '@app/common/administrative-area-level-1/domain/value-objects';
import { CommonCountry } from '@app/common/country';
import { CQMetadata, LiteralObject } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

export class CommonAdministrativeAreaLevel1 extends AggregateRoot {
  id: CommonAdministrativeAreaLevel1Id;
  rowId: CommonAdministrativeAreaLevel1RowId;
  countryId: CommonAdministrativeAreaLevel1CountryId;
  code: CommonAdministrativeAreaLevel1Code;
  customCode: CommonAdministrativeAreaLevel1CustomCode;
  name: CommonAdministrativeAreaLevel1Name;
  slug: CommonAdministrativeAreaLevel1Slug;
  latitude: CommonAdministrativeAreaLevel1Latitude;
  longitude: CommonAdministrativeAreaLevel1Longitude;
  zoom: CommonAdministrativeAreaLevel1Zoom;
  mapType: CommonAdministrativeAreaLevel1MapType;
  createdAt: CommonAdministrativeAreaLevel1CreatedAt;
  updatedAt: CommonAdministrativeAreaLevel1UpdatedAt;
  deletedAt: CommonAdministrativeAreaLevel1DeletedAt;
  country: CommonCountry;

  constructor(
    id: CommonAdministrativeAreaLevel1Id,
    rowId: CommonAdministrativeAreaLevel1RowId,
    countryId: CommonAdministrativeAreaLevel1CountryId,
    code: CommonAdministrativeAreaLevel1Code,
    customCode: CommonAdministrativeAreaLevel1CustomCode,
    name: CommonAdministrativeAreaLevel1Name,
    slug: CommonAdministrativeAreaLevel1Slug,
    latitude: CommonAdministrativeAreaLevel1Latitude,
    longitude: CommonAdministrativeAreaLevel1Longitude,
    zoom: CommonAdministrativeAreaLevel1Zoom,
    mapType: CommonAdministrativeAreaLevel1MapType,
    createdAt: CommonAdministrativeAreaLevel1CreatedAt,
    updatedAt: CommonAdministrativeAreaLevel1UpdatedAt,
    deletedAt: CommonAdministrativeAreaLevel1DeletedAt,
    country?: CommonCountry,
  ) {
    super();
    this.id = id;
    this.rowId = rowId;
    this.countryId = countryId;
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
  }

  static register(
    id: CommonAdministrativeAreaLevel1Id,
    rowId: CommonAdministrativeAreaLevel1RowId,
    countryId: CommonAdministrativeAreaLevel1CountryId,
    code: CommonAdministrativeAreaLevel1Code,
    customCode: CommonAdministrativeAreaLevel1CustomCode,
    name: CommonAdministrativeAreaLevel1Name,
    slug: CommonAdministrativeAreaLevel1Slug,
    latitude: CommonAdministrativeAreaLevel1Latitude,
    longitude: CommonAdministrativeAreaLevel1Longitude,
    zoom: CommonAdministrativeAreaLevel1Zoom,
    mapType: CommonAdministrativeAreaLevel1MapType,
    createdAt: CommonAdministrativeAreaLevel1CreatedAt,
    updatedAt: CommonAdministrativeAreaLevel1UpdatedAt,
    deletedAt: CommonAdministrativeAreaLevel1DeletedAt,
    country?: CommonCountry,
  ): CommonAdministrativeAreaLevel1 {
    return new CommonAdministrativeAreaLevel1(
      id,
      rowId,
      countryId,
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
    );
  }

  created(event: {
    payload: CommonAdministrativeAreaLevel1;
    cQMetadata?: CQMetadata;
  }): void {
    this.apply(
      new CommonCreatedAdministrativeAreaLevel1Event({
        payload: {
          id: event.payload.id.value,
          countryId: event.payload.countryId.value,
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
    payload: CommonAdministrativeAreaLevel1;
    cQMetadata?: CQMetadata;
  }): void {
    this.apply(
      new CommonUpdatedAdministrativeAreaLevel1Event({
        payload: {
          id: event.payload.id?.value,
          countryId: event.payload.countryId?.value,
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
    payload: CommonAdministrativeAreaLevel1;
    cQMetadata?: CQMetadata;
  }): void {
    this.apply(
      new CommonDeletedAdministrativeAreaLevel1Event({
        payload: {
          id: event.payload.id.value,
          rowId: event.payload.rowId.value,
          countryId: event.payload.countryId.value,
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
    };
  }

  // function called to get data for repository side effect methods
  toRepository(): LiteralObject {
    return {
      id: this.id.value,
      countryId: this.countryId.value,
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
    };
  }
}
