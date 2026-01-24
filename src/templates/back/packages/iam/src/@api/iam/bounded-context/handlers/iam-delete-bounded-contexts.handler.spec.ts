/**
 * @aurora-generated
 * @source cliter/iam/bounded-context.aurora.yaml
 */
import { IamDeleteBoundedContextsHandler } from '@api/iam/bounded-context';
import { iamMockBoundedContextData } from '@app/iam/bounded-context';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamDeleteBoundedContextsHandler', () => {
  let handler: IamDeleteBoundedContextsHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        IamDeleteBoundedContextsHandler,
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

    handler = module.get<IamDeleteBoundedContextsHandler>(
      IamDeleteBoundedContextsHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('IamDeleteBoundedContextsHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('IamDeleteBoundedContextsHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return an iamMockBoundedContextData deleted', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () => new Promise((resolve) => resolve(iamMockBoundedContextData)),
        );
      expect(await handler.main({}, {}, 'Europe/Madrid')).toBe(
        iamMockBoundedContextData,
      );
    });
  });
});
