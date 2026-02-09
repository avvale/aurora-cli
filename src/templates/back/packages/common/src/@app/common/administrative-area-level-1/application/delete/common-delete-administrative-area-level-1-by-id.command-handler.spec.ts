/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-1.aurora.yaml
 */
import {
  CommonDeleteAdministrativeAreaLevel1ByIdCommand,
  commonMockAdministrativeAreaLevel1Data,
} from '@app/common/administrative-area-level-1';
import { CommonDeleteAdministrativeAreaLevel1ByIdCommandHandler } from '@app/common/administrative-area-level-1/application/delete/common-delete-administrative-area-level-1-by-id.command-handler';
import { CommonDeleteAdministrativeAreaLevel1ByIdService } from '@app/common/administrative-area-level-1/application/delete/common-delete-administrative-area-level-1-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonDeleteAdministrativeAreaLevel1ByIdCommandHandler', () => {
  let commandHandler: CommonDeleteAdministrativeAreaLevel1ByIdCommandHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommonDeleteAdministrativeAreaLevel1ByIdCommandHandler,
        {
          provide: CommonDeleteAdministrativeAreaLevel1ByIdService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    commandHandler =
      module.get<CommonDeleteAdministrativeAreaLevel1ByIdCommandHandler>(
        CommonDeleteAdministrativeAreaLevel1ByIdCommandHandler,
      );
  });

  describe('main', () => {
    test('CommonDeleteAdministrativeAreaLevel1ByIdCommandHandler should be defined', () => {
      expect(commandHandler).toBeDefined();
    });

    test('should create the value object id and pass them as parameters to the CommonDeleteAdministrativeAreaLevel1ByIdService', async () => {
      expect(
        await commandHandler.execute(
          new CommonDeleteAdministrativeAreaLevel1ByIdCommand(
            commonMockAdministrativeAreaLevel1Data[0].id,
          ),
        ),
      ).toBe(undefined);
    });
  });
});
