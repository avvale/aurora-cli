/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CommonIAdministrativeAreaLevel1Repository,
  commonMockAdministrativeAreaLevel1Data,
  CommonMockAdministrativeAreaLevel1Repository,
} from '@app/common/administrative-area-level-1';
import { CommonUpdateAdministrativeAreasLevel1Service } from '@app/common/administrative-area-level-1/application/update/common-update-administrative-areas-level-1.service';
import {
  CommonAdministrativeAreaLevel1Code,
  CommonAdministrativeAreaLevel1CountryId,
  CommonAdministrativeAreaLevel1CustomCode,
  CommonAdministrativeAreaLevel1Id,
  CommonAdministrativeAreaLevel1Latitude,
  CommonAdministrativeAreaLevel1Longitude,
  CommonAdministrativeAreaLevel1MapType,
  CommonAdministrativeAreaLevel1Name,
  CommonAdministrativeAreaLevel1Slug,
  CommonAdministrativeAreaLevel1Zoom,
} from '@app/common/administrative-area-level-1/domain/value-objects';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonUpdateAdministrativeAreasLevel1Service', () => {
  let service: CommonUpdateAdministrativeAreasLevel1Service;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        CommonUpdateAdministrativeAreasLevel1Service,
        CommonMockAdministrativeAreaLevel1Repository,
        {
          provide: CommonIAdministrativeAreaLevel1Repository,
          useValue: {
            update: () => {
              /**/
            },
            get: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(CommonUpdateAdministrativeAreasLevel1Service);
  });

  describe('main', () => {
    test('UpdateAdministrativeAreasLevel1Service should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should update a administrativeAreasLevel1 and emit event', async () => {
      expect(
        await service.main(
          {
            id: new CommonAdministrativeAreaLevel1Id(
              commonMockAdministrativeAreaLevel1Data[0].id,
            ),
            countryId: new CommonAdministrativeAreaLevel1CountryId(
              commonMockAdministrativeAreaLevel1Data[0].countryId,
            ),
            code: new CommonAdministrativeAreaLevel1Code(
              commonMockAdministrativeAreaLevel1Data[0].code,
            ),
            customCode: new CommonAdministrativeAreaLevel1CustomCode(
              commonMockAdministrativeAreaLevel1Data[0].customCode,
            ),
            name: new CommonAdministrativeAreaLevel1Name(
              commonMockAdministrativeAreaLevel1Data[0].name,
            ),
            slug: new CommonAdministrativeAreaLevel1Slug(
              commonMockAdministrativeAreaLevel1Data[0].slug,
            ),
            latitude: new CommonAdministrativeAreaLevel1Latitude(
              commonMockAdministrativeAreaLevel1Data[0].latitude,
            ),
            longitude: new CommonAdministrativeAreaLevel1Longitude(
              commonMockAdministrativeAreaLevel1Data[0].longitude,
            ),
            zoom: new CommonAdministrativeAreaLevel1Zoom(
              commonMockAdministrativeAreaLevel1Data[0].zoom,
            ),
            mapType: new CommonAdministrativeAreaLevel1MapType(
              commonMockAdministrativeAreaLevel1Data[0].mapType,
            ),
          },
          {},
          {},
        ),
      ).toBe(undefined);
    });
  });
});
