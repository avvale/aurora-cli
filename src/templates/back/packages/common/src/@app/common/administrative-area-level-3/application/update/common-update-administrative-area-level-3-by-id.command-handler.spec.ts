/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-3.aurora.yaml
 */
import {
  commonMockAdministrativeAreaLevel3Data,
  CommonUpdateAdministrativeAreaLevel3ByIdCommand,
} from '@app/common/administrative-area-level-3';
import { CommonUpdateAdministrativeAreaLevel3ByIdCommandHandler } from '@app/common/administrative-area-level-3/application/update/common-update-administrative-area-level-3-by-id.command-handler';
import { CommonUpdateAdministrativeAreaLevel3ByIdService } from '@app/common/administrative-area-level-3/application/update/common-update-administrative-area-level-3-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonUpdateAdministrativeAreaLevel3ByIdCommandHandler', () => {
  let commandHandler: CommonUpdateAdministrativeAreaLevel3ByIdCommandHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommonUpdateAdministrativeAreaLevel3ByIdCommandHandler,
        {
          provide: CommonUpdateAdministrativeAreaLevel3ByIdService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    commandHandler =
      module.get<CommonUpdateAdministrativeAreaLevel3ByIdCommandHandler>(
        CommonUpdateAdministrativeAreaLevel3ByIdCommandHandler,
      );
  });

  describe('main', () => {
    test('UpdateAdministrativeAreaLevel3ByIdCommandHandler should be defined', () => {
      expect(commandHandler).toBeDefined();
    });

    test('should return an administrativeAreaLevel3 created', async () => {
      expect(
        await commandHandler.execute(
          new CommonUpdateAdministrativeAreaLevel3ByIdCommand(
            {
              id: commonMockAdministrativeAreaLevel3Data[0].id,
              rowId: commonMockAdministrativeAreaLevel3Data[0].rowId,
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
            {},
            { timezone: process.env.TZ },
          ),
        ),
      ).toBe(undefined);
    });
  });
});
