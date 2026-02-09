/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-3.aurora.yaml
 */
import {
  CommonCreateAdministrativeAreasLevel3Command,
  commonMockAdministrativeAreaLevel3Data,
} from '@app/common/administrative-area-level-3';
import { CommonCreateAdministrativeAreasLevel3CommandHandler } from '@app/common/administrative-area-level-3/application/create/common-create-administrative-areas-level-3.command-handler';
import { CommonCreateAdministrativeAreasLevel3Service } from '@app/common/administrative-area-level-3/application/create/common-create-administrative-areas-level-3.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('commonCreateAdministrativeAreasLevel3CommandHandler', () => {
  let commandHandler: CommonCreateAdministrativeAreasLevel3CommandHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommonCreateAdministrativeAreasLevel3CommandHandler,
        {
          provide: CommonCreateAdministrativeAreasLevel3Service,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    commandHandler =
      module.get<CommonCreateAdministrativeAreasLevel3CommandHandler>(
        CommonCreateAdministrativeAreasLevel3CommandHandler,
      );
  });

  describe('main', () => {
    test('CommonCreateAdministrativeAreasLevel3CommandHandler should be defined', () => {
      expect(commandHandler).toBeDefined();
    });

    test('should return CommonMockAdministrativeAreaLevel3Data created', async () => {
      expect(
        await commandHandler.execute(
          new CommonCreateAdministrativeAreasLevel3Command(
            commonMockAdministrativeAreaLevel3Data,
            { timezone: process.env.TZ },
          ),
        ),
      ).toBe(undefined);
    });
  });
});
