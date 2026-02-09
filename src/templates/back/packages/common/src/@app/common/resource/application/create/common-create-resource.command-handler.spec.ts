/**
 * @aurora-generated
 * @source cliter/common/resource.aurora.yaml
 */
import {
  CommonCreateResourceCommand,
  commonMockResourceData,
} from '@app/common/resource';
import { Test, TestingModule } from '@nestjs/testing';
import { CommonCreateResourceCommandHandler } from './common-create-resource.command-handler';
import { CommonCreateResourceService } from './common-create-resource.service';

describe('CommonCreateResourceCommandHandler', () => {
  let commandHandler: CommonCreateResourceCommandHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommonCreateResourceCommandHandler,
        {
          provide: CommonCreateResourceService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    commandHandler = module.get<CommonCreateResourceCommandHandler>(
      CommonCreateResourceCommandHandler,
    );
  });

  describe('main', () => {
    test('CreateResourceCommandHandler should be defined', () => {
      expect(commandHandler).toBeDefined();
    });

    test('should create the values objects and pass them as parameters to the CommonCreateResourceService', async () => {
      expect(
        await commandHandler.execute(
          new CommonCreateResourceCommand(
            {
              id: commonMockResourceData[0].id,
              rowId: commonMockResourceData[0].rowId,
              code: commonMockResourceData[0].code,
              name: commonMockResourceData[0].name,
              isActive: commonMockResourceData[0].isActive,
              hasAttachments: commonMockResourceData[0].hasAttachments,
            },
            { timezone: process.env.TZ },
          ),
        ),
      ).toBe(undefined);
    });
  });
});
