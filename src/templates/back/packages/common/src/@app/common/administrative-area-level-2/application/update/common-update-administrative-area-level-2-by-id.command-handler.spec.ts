import {
  commonMockAdministrativeAreaLevel2Data,
  CommonUpdateAdministrativeAreaLevel2ByIdCommand,
} from '@app/common/administrative-area-level-2';
import { CommonUpdateAdministrativeAreaLevel2ByIdCommandHandler } from '@app/common/administrative-area-level-2/application/update/common-update-administrative-area-level-2-by-id.command-handler';
import { CommonUpdateAdministrativeAreaLevel2ByIdService } from '@app/common/administrative-area-level-2/application/update/common-update-administrative-area-level-2-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonUpdateAdministrativeAreaLevel2ByIdCommandHandler', () => {
  let commandHandler: CommonUpdateAdministrativeAreaLevel2ByIdCommandHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommonUpdateAdministrativeAreaLevel2ByIdCommandHandler,
        {
          provide: CommonUpdateAdministrativeAreaLevel2ByIdService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    commandHandler =
      module.get<CommonUpdateAdministrativeAreaLevel2ByIdCommandHandler>(
        CommonUpdateAdministrativeAreaLevel2ByIdCommandHandler,
      );
  });

  describe('main', () => {
    test('UpdateAdministrativeAreaLevel2ByIdCommandHandler should be defined', () => {
      expect(commandHandler).toBeDefined();
    });

    test('should return an administrativeAreaLevel2 created', async () => {
      expect(
        await commandHandler.execute(
          new CommonUpdateAdministrativeAreaLevel2ByIdCommand(
            {
              id: commonMockAdministrativeAreaLevel2Data[0].id,
              countryId: commonMockAdministrativeAreaLevel2Data[0].countryId,
              administrativeAreaLevel1Id:
                commonMockAdministrativeAreaLevel2Data[0]
                  .administrativeAreaLevel1Id,
              code: commonMockAdministrativeAreaLevel2Data[0].code,
              customCode: commonMockAdministrativeAreaLevel2Data[0].customCode,
              name: commonMockAdministrativeAreaLevel2Data[0].name,
              slug: commonMockAdministrativeAreaLevel2Data[0].slug,
              latitude: commonMockAdministrativeAreaLevel2Data[0].latitude,
              longitude: commonMockAdministrativeAreaLevel2Data[0].longitude,
              zoom: commonMockAdministrativeAreaLevel2Data[0].zoom,
              mapType: commonMockAdministrativeAreaLevel2Data[0].mapType,
            },
            {},
            { timezone: process.env.TZ },
          ),
        ),
      ).toBe(undefined);
    });
  });
});
