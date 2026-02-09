/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-3.aurora.yaml
 */
import {
  CommonDeleteAdministrativeAreaLevel3ByIdCommand,
  commonMockAdministrativeAreaLevel3Data,
} from '@app/common/administrative-area-level-3';
import { CommonDeleteAdministrativeAreaLevel3ByIdCommandHandler } from '@app/common/administrative-area-level-3/application/delete/common-delete-administrative-area-level-3-by-id.command-handler';
import { CommonDeleteAdministrativeAreaLevel3ByIdService } from '@app/common/administrative-area-level-3/application/delete/common-delete-administrative-area-level-3-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonDeleteAdministrativeAreaLevel3ByIdCommandHandler', () => {
  let commandHandler: CommonDeleteAdministrativeAreaLevel3ByIdCommandHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommonDeleteAdministrativeAreaLevel3ByIdCommandHandler,
        {
          provide: CommonDeleteAdministrativeAreaLevel3ByIdService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    commandHandler =
      module.get<CommonDeleteAdministrativeAreaLevel3ByIdCommandHandler>(
        CommonDeleteAdministrativeAreaLevel3ByIdCommandHandler,
      );
  });

  describe('main', () => {
    test('CommonDeleteAdministrativeAreaLevel3ByIdCommandHandler should be defined', () => {
      expect(commandHandler).toBeDefined();
    });

    test('should create the value object id and pass them as parameters to the CommonDeleteAdministrativeAreaLevel3ByIdService', async () => {
      expect(
        await commandHandler.execute(
          new CommonDeleteAdministrativeAreaLevel3ByIdCommand(
            commonMockAdministrativeAreaLevel3Data[0].id,
          ),
        ),
      ).toBe(undefined);
    });
  });
});
