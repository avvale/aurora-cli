import { CommonCreateResourcesHandler } from '@api/common/resource';
import { commonMockResourceData } from '@app/common/resource';
import { ICommandBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonCreateResourcesHandler', () => {
  let handler: CommonCreateResourcesHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommonCreateResourcesHandler,
        {
          provide: ICommandBus,
          useValue: {
            dispatch: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    handler = module.get<CommonCreateResourcesHandler>(
      CommonCreateResourcesHandler,
    );
  });

  describe('main', () => {
    test('CommonCreateResourcesHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return an commonMockResourceData created', async () => {
      expect(await handler.main(commonMockResourceData)).toBe(true);
    });
  });
});
