import {
  commonMockResourceData,
  CommonUpdateResourcesCommand,
} from '@app/common/resource';
import { CommonUpdateResourcesCommandHandler } from '@app/common/resource/application/update/common-update-resources.command-handler';
import { CommonUpdateResourcesService } from '@app/common/resource/application/update/common-update-resources.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonUpdateResourcesCommandHandler', () => {
  let commandHandler: CommonUpdateResourcesCommandHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommonUpdateResourcesCommandHandler,
        {
          provide: CommonUpdateResourcesService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    commandHandler = module.get<CommonUpdateResourcesCommandHandler>(
      CommonUpdateResourcesCommandHandler,
    );
  });

  describe('main', () => {
    test('UpdateResourcesCommandHandler should be defined', () => {
      expect(commandHandler).toBeDefined();
    });

    test('should return an resources updated', async () => {
      expect(
        await commandHandler.execute(
          new CommonUpdateResourcesCommand(
            {
              id: commonMockResourceData[0].id,
              code: commonMockResourceData[0].code,
              name: commonMockResourceData[0].name,
              isActive: commonMockResourceData[0].isActive,
              hasAttachments: commonMockResourceData[0].hasAttachments,
            },
            {},
            {},
            { timezone: process.env.TZ },
          ),
        ),
      ).toBe(undefined);
    });
  });
});
