import { CommonDeleteAdministrativeAreasLevel3Command } from '@app/common/administrative-area-level-3';
import { CommonDeleteAdministrativeAreasLevel3CommandHandler } from '@app/common/administrative-area-level-3/application/delete/common-delete-administrative-areas-level-3.command-handler';
import { CommonDeleteAdministrativeAreasLevel3Service } from '@app/common/administrative-area-level-3/application/delete/common-delete-administrative-areas-level-3.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonDeleteAdministrativeAreasLevel3CommandHandler', () => {
  let commandHandler: CommonDeleteAdministrativeAreasLevel3CommandHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommonDeleteAdministrativeAreasLevel3CommandHandler,
        {
          provide: CommonDeleteAdministrativeAreasLevel3Service,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    commandHandler =
      module.get<CommonDeleteAdministrativeAreasLevel3CommandHandler>(
        CommonDeleteAdministrativeAreasLevel3CommandHandler,
      );
  });

  describe('main', () => {
    test('CommonDeleteAdministrativeAreasLevel3CommandHandler should be defined', () => {
      expect(commandHandler).toBeDefined();
    });

    test('should return void', async () => {
      expect(
        await commandHandler.execute(
          new CommonDeleteAdministrativeAreasLevel3Command(),
        ),
      ).toBe(undefined);
    });
  });
});
