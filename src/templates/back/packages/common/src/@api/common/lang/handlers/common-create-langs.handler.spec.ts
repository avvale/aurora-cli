import { CommonCreateLangsHandler } from '@api/common/lang';
import { commonMockLangData } from '@app/common/lang';
import { ICommandBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonCreateLangsHandler', () => {
  let handler: CommonCreateLangsHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommonCreateLangsHandler,
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

    handler = module.get<CommonCreateLangsHandler>(CommonCreateLangsHandler);
  });

  describe('main', () => {
    test('CommonCreateLangsHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return an commonMockLangData created', async () => {
      expect(await handler.main(commonMockLangData)).toBe(true);
    });
  });
});
