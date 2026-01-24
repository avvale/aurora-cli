import {
  commonMockCountryData,
  CommonUpsertCountryCommand,
} from '@app/common/country';
import { CommonUpsertCountryCommandHandler } from '@app/common/country/application/upsert/common-upsert-country.command-handler';
import { CommonUpsertCountryService } from '@app/common/country/application/upsert/common-upsert-country.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonUpsertCountryCommandHandler', () => {
  let commandHandler: CommonUpsertCountryCommandHandler;
  let service: CommonUpsertCountryService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommonUpsertCountryCommandHandler,
        {
          provide: CommonUpsertCountryService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    commandHandler = module.get<CommonUpsertCountryCommandHandler>(
      CommonUpsertCountryCommandHandler,
    );
    service = module.get<CommonUpsertCountryService>(
      CommonUpsertCountryService,
    );
  });

  describe('main', () => {
    test('UpsertCountryCommandHandler should be defined', () => {
      expect(commandHandler).toBeDefined();
    });

    test('should upsert the values objects and pass them as parameters to the CommonUpsertCountryService', async () => {
      expect(
        await commandHandler.execute(
          new CommonUpsertCountryCommand(
            {
              id: commonMockCountryData[0].id,
              iso3166Alpha2: commonMockCountryData[0].iso3166Alpha2,
              iso3166Alpha3: commonMockCountryData[0].iso3166Alpha3,
              iso3166Numeric: commonMockCountryData[0].iso3166Numeric,
              customCode: commonMockCountryData[0].customCode,
              prefix: commonMockCountryData[0].prefix,
              image: commonMockCountryData[0].image,
              sort: commonMockCountryData[0].sort,
              administrativeAreas: commonMockCountryData[0].administrativeAreas,
              latitude: commonMockCountryData[0].latitude,
              longitude: commonMockCountryData[0].longitude,
              zoom: commonMockCountryData[0].zoom,
              mapType: commonMockCountryData[0].mapType,
              langId: commonMockCountryData[0].langId,
              name: commonMockCountryData[0].name,
              slug: commonMockCountryData[0].slug,
              administrativeAreaLevel1:
                commonMockCountryData[0].administrativeAreaLevel1,
              administrativeAreaLevel2:
                commonMockCountryData[0].administrativeAreaLevel2,
              administrativeAreaLevel3:
                commonMockCountryData[0].administrativeAreaLevel3,
            },
            { timezone: process.env.TZ },
          ),
        ),
      ).toBe(undefined);
    });
  });
});
