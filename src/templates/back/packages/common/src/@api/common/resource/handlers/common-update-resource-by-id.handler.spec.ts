/**
 * @aurora-generated
 * @source cliter/common/resource.aurora.yaml
 */
import { CommonUpdateResourceByIdHandler } from '@api/common/resource';
import { CommonUpdateResourceByIdInput } from '@api/graphql';
import { commonMockResourceData } from '@app/common/resource';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonUpdateResourceByIdHandler', () => {
  let handler: CommonUpdateResourceByIdHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        CommonUpdateResourceByIdHandler,
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

    handler = module.get<CommonUpdateResourceByIdHandler>(
      CommonUpdateResourceByIdHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('CommonUpdateResourceByIdHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('CommonUpdateResourceByIdHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return a resource updated', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () => new Promise((resolve) => resolve(commonMockResourceData[0])),
        );
      expect(
        await handler.main(
          <CommonUpdateResourceByIdInput>commonMockResourceData[0],
          {},
          'Europe/Madrid',
        ),
      ).toBe(commonMockResourceData[0]);
    });
  });
});
