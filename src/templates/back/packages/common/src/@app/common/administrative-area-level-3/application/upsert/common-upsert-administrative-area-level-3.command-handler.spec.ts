import {
  commonMockAdministrativeAreaLevel3Data,
  CommonUpsertAdministrativeAreaLevel3Command,
} from '@app/common/administrative-area-level-3';
import { CommonUpsertAdministrativeAreaLevel3CommandHandler } from '@app/common/administrative-area-level-3/application/upsert/common-upsert-administrative-area-level-3.command-handler';
import { CommonUpsertAdministrativeAreaLevel3Service } from '@app/common/administrative-area-level-3/application/upsert/common-upsert-administrative-area-level-3.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonUpsertAdministrativeAreaLevel3CommandHandler', () => {
  let commandHandler: CommonUpsertAdministrativeAreaLevel3CommandHandler;
  let service: CommonUpsertAdministrativeAreaLevel3Service;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommonUpsertAdministrativeAreaLevel3CommandHandler,
        {
          provide: CommonUpsertAdministrativeAreaLevel3Service,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    commandHandler =
      module.get<CommonUpsertAdministrativeAreaLevel3CommandHandler>(
        CommonUpsertAdministrativeAreaLevel3CommandHandler,
      );
    service = module.get<CommonUpsertAdministrativeAreaLevel3Service>(
      CommonUpsertAdministrativeAreaLevel3Service,
    );
  });

  describe('main', () => {
    test('UpsertAdministrativeAreaLevel3CommandHandler should be defined', () => {
      expect(commandHandler).toBeDefined();
    });

    test('should upsert the values objects and pass them as parameters to the CommonUpsertAdministrativeAreaLevel3Service', async () => {
      expect(
        await commandHandler.execute(
          new CommonUpsertAdministrativeAreaLevel3Command(
            {
              id: commonMockAdministrativeAreaLevel3Data[0].id,
              countryId: commonMockAdministrativeAreaLevel3Data[0].countryId,
              administrativeAreaLevel1Id:
                commonMockAdministrativeAreaLevel3Data[0]
                  .administrativeAreaLevel1Id,
              administrativeAreaLevel2Id:
                commonMockAdministrativeAreaLevel3Data[0]
                  .administrativeAreaLevel2Id,
              code: commonMockAdministrativeAreaLevel3Data[0].code,
              customCode: commonMockAdministrativeAreaLevel3Data[0].customCode,
              name: commonMockAdministrativeAreaLevel3Data[0].name,
              slug: commonMockAdministrativeAreaLevel3Data[0].slug,
              latitude: commonMockAdministrativeAreaLevel3Data[0].latitude,
              longitude: commonMockAdministrativeAreaLevel3Data[0].longitude,
              zoom: commonMockAdministrativeAreaLevel3Data[0].zoom,
              mapType: commonMockAdministrativeAreaLevel3Data[0].mapType,
            },
            { timezone: process.env.TZ },
          ),
        ),
      ).toBe(undefined);
    });
  });
});
