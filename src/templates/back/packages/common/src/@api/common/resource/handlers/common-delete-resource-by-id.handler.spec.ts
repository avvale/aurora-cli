/**
 * @aurora-generated
 * @source cliter/common/resource.aurora.yaml
 */
import { CommonDeleteResourceByIdHandler } from '@api/common/resource';
import { commonMockResourceData } from '@app/common/resource';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonDeleteResourceByIdController', () => {
  let handler: CommonDeleteResourceByIdHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        CommonDeleteResourceByIdHandler,
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

    handler = module.get<CommonDeleteResourceByIdHandler>(
      CommonDeleteResourceByIdHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  describe('main', () => {
    test('CommonDeleteResourceByIdHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return an resource deleted', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () => new Promise((resolve) => resolve(commonMockResourceData[0])),
        );
      expect(
        await handler.main(commonMockResourceData[0].id, {}, 'Europe/Madrid'),
      ).toBe(commonMockResourceData[0]);
    });
  });
});
