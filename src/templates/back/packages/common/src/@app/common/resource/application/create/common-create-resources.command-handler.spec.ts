import {
  CommonCreateResourcesCommand,
  commonMockResourceData,
} from '@app/common/resource';
import { CommonCreateResourcesCommandHandler } from '@app/common/resource/application/create/common-create-resources.command-handler';
import { CommonCreateResourcesService } from '@app/common/resource/application/create/common-create-resources.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('commonCreateResourcesCommandHandler', () => {
  let commandHandler: CommonCreateResourcesCommandHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommonCreateResourcesCommandHandler,
        {
          provide: CommonCreateResourcesService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    commandHandler = module.get<CommonCreateResourcesCommandHandler>(
      CommonCreateResourcesCommandHandler,
    );
  });

  describe('main', () => {
    test('CommonCreateResourcesCommandHandler should be defined', () => {
      expect(commandHandler).toBeDefined();
    });

    test('should return CommonMockResourceData created', async () => {
      expect(
        await commandHandler.execute(
          new CommonCreateResourcesCommand(commonMockResourceData, {
            timezone: process.env.TZ,
          }),
        ),
      ).toBe(undefined);
    });
  });
});
