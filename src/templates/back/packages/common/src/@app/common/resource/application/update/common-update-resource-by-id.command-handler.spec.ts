import {
  commonMockResourceData,
  CommonUpdateResourceByIdCommand,
} from '@app/common/resource';
import { CommonUpdateResourceByIdCommandHandler } from '@app/common/resource/application/update/common-update-resource-by-id.command-handler';
import { CommonUpdateResourceByIdService } from '@app/common/resource/application/update/common-update-resource-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonUpdateResourceByIdCommandHandler', () => {
  let commandHandler: CommonUpdateResourceByIdCommandHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommonUpdateResourceByIdCommandHandler,
        {
          provide: CommonUpdateResourceByIdService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    commandHandler = module.get<CommonUpdateResourceByIdCommandHandler>(
      CommonUpdateResourceByIdCommandHandler,
    );
  });

  describe('main', () => {
    test('UpdateResourceByIdCommandHandler should be defined', () => {
      expect(commandHandler).toBeDefined();
    });

    test('should return an resource created', async () => {
      expect(
        await commandHandler.execute(
          new CommonUpdateResourceByIdCommand(
            {
              id: commonMockResourceData[0].id,
              code: commonMockResourceData[0].code,
              name: commonMockResourceData[0].name,
              isActive: commonMockResourceData[0].isActive,
              hasAttachments: commonMockResourceData[0].hasAttachments,
            },
            {},
            { timezone: process.env.TZ },
          ),
        ),
      ).toBe(undefined);
    });
  });
});
