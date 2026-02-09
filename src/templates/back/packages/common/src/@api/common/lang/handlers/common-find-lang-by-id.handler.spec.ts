/**
 * @aurora-generated
 * @source cliter/common/lang.aurora.yaml
 */
import { CommonFindLangByIdHandler } from '@api/common/lang';
import { commonMockLangData } from '@app/common/lang';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonFindLangByIdHandler', () => {
  let handler: CommonFindLangByIdHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        CommonFindLangByIdHandler,
        {
          provide: IQueryBus,
          useValue: {
            ask: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    handler = module.get<CommonFindLangByIdHandler>(CommonFindLangByIdHandler);
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('CommonFindLangByIdHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('CommonFindLangByIdHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return an lang by id', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () => new Promise((resolve) => resolve(commonMockLangData[0])),
        );
      expect(
        await handler.main(commonMockLangData[0].id, {}, 'Europe/Madrid'),
      ).toBe(commonMockLangData[0]);
    });
  });
});
