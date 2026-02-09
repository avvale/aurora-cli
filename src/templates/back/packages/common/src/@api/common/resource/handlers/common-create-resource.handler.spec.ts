/**
 * @aurora-generated
 * @source cliter/common/resource.aurora.yaml
 */
import { CommonCreateResourceHandler } from '@api/common/resource';
import { commonMockResourceData } from '@app/common/resource';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonCreateResourceHandler', () => {
  let handler: CommonCreateResourceHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        CommonCreateResourceHandler,
        {
          provide: IQueryBus,
          useValue: {
            ask: () => {
              /**/
            },
          },
        },
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

    handler = module.get<CommonCreateResourceHandler>(
      CommonCreateResourceHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  describe('main', () => {
    test('CommonCreateResourceHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return an resource created', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () => new Promise((resolve) => resolve(commonMockResourceData[0])),
        );
      expect(
        await handler.main(commonMockResourceData[0], 'Europe/Madrid'),
      ).toBe(commonMockResourceData[0]);
    });
  });
});
