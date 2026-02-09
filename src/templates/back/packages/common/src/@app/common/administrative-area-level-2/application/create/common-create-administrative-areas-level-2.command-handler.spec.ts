/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-2.aurora.yaml
 */
import {
  CommonCreateAdministrativeAreasLevel2Command,
  commonMockAdministrativeAreaLevel2Data,
} from '@app/common/administrative-area-level-2';
import { CommonCreateAdministrativeAreasLevel2CommandHandler } from '@app/common/administrative-area-level-2/application/create/common-create-administrative-areas-level-2.command-handler';
import { CommonCreateAdministrativeAreasLevel2Service } from '@app/common/administrative-area-level-2/application/create/common-create-administrative-areas-level-2.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('commonCreateAdministrativeAreasLevel2CommandHandler', () => {
  let commandHandler: CommonCreateAdministrativeAreasLevel2CommandHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommonCreateAdministrativeAreasLevel2CommandHandler,
        {
          provide: CommonCreateAdministrativeAreasLevel2Service,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    commandHandler =
      module.get<CommonCreateAdministrativeAreasLevel2CommandHandler>(
        CommonCreateAdministrativeAreasLevel2CommandHandler,
      );
  });

  describe('main', () => {
    test('CommonCreateAdministrativeAreasLevel2CommandHandler should be defined', () => {
      expect(commandHandler).toBeDefined();
    });

    test('should return CommonMockAdministrativeAreaLevel2Data created', async () => {
      expect(
        await commandHandler.execute(
          new CommonCreateAdministrativeAreasLevel2Command(
            commonMockAdministrativeAreaLevel2Data,
            { timezone: process.env.TZ },
          ),
        ),
      ).toBe(undefined);
    });
  });
});
