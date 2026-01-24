/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CommonIAdministrativeAreaLevel3Repository,
  commonMockAdministrativeAreaLevel3Data,
  CommonMockAdministrativeAreaLevel3Repository,
} from '@app/common/administrative-area-level-3';
import { CommonUpsertAdministrativeAreaLevel3Service } from '@app/common/administrative-area-level-3/application/upsert/common-upsert-administrative-area-level-3.service';
import {
  CommonAdministrativeAreaLevel3AdministrativeAreaLevel1Id,
  CommonAdministrativeAreaLevel3AdministrativeAreaLevel2Id,
  CommonAdministrativeAreaLevel3Code,
  CommonAdministrativeAreaLevel3CountryId,
  CommonAdministrativeAreaLevel3CustomCode,
  CommonAdministrativeAreaLevel3Id,
  CommonAdministrativeAreaLevel3Latitude,
  CommonAdministrativeAreaLevel3Longitude,
  CommonAdministrativeAreaLevel3MapType,
  CommonAdministrativeAreaLevel3Name,
  CommonAdministrativeAreaLevel3Slug,
  CommonAdministrativeAreaLevel3Zoom,
} from '@app/common/administrative-area-level-3/domain/value-objects';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonUpsertAdministrativeAreaLevel3Service', () => {
  let service: CommonUpsertAdministrativeAreaLevel3Service;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        CommonUpsertAdministrativeAreaLevel3Service,
        CommonMockAdministrativeAreaLevel3Repository,
        {
          provide: CommonIAdministrativeAreaLevel3Repository,
          useValue: {
            upsert: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(CommonUpsertAdministrativeAreaLevel3Service);
  });

  describe('main', () => {
    test('CommonUpsertAdministrativeAreaLevel3Service should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should upsert a administrativeAreaLevel3 and emit event', async () => {
      expect(
        await service.main({
          id: new CommonAdministrativeAreaLevel3Id(
            commonMockAdministrativeAreaLevel3Data[0].id,
          ),
          countryId: new CommonAdministrativeAreaLevel3CountryId(
            commonMockAdministrativeAreaLevel3Data[0].countryId,
          ),
          administrativeAreaLevel1Id:
            new CommonAdministrativeAreaLevel3AdministrativeAreaLevel1Id(
              commonMockAdministrativeAreaLevel3Data[0].administrativeAreaLevel1Id,
            ),
          administrativeAreaLevel2Id:
            new CommonAdministrativeAreaLevel3AdministrativeAreaLevel2Id(
              commonMockAdministrativeAreaLevel3Data[0].administrativeAreaLevel2Id,
            ),
          code: new CommonAdministrativeAreaLevel3Code(
            commonMockAdministrativeAreaLevel3Data[0].code,
          ),
          customCode: new CommonAdministrativeAreaLevel3CustomCode(
            commonMockAdministrativeAreaLevel3Data[0].customCode,
          ),
          name: new CommonAdministrativeAreaLevel3Name(
            commonMockAdministrativeAreaLevel3Data[0].name,
          ),
          slug: new CommonAdministrativeAreaLevel3Slug(
            commonMockAdministrativeAreaLevel3Data[0].slug,
          ),
          latitude: new CommonAdministrativeAreaLevel3Latitude(
            commonMockAdministrativeAreaLevel3Data[0].latitude,
          ),
          longitude: new CommonAdministrativeAreaLevel3Longitude(
            commonMockAdministrativeAreaLevel3Data[0].longitude,
          ),
          zoom: new CommonAdministrativeAreaLevel3Zoom(
            commonMockAdministrativeAreaLevel3Data[0].zoom,
          ),
          mapType: new CommonAdministrativeAreaLevel3MapType(
            commonMockAdministrativeAreaLevel3Data[0].mapType,
          ),
        }),
      ).toBe(undefined);
    });
  });
});
