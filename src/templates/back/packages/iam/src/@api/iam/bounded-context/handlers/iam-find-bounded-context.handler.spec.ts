/**
 * @aurora-generated
 * @source cliter/iam/bounded-context.aurora.yaml
 */
import { IamFindBoundedContextHandler } from '@api/iam/bounded-context';
import { iamMockBoundedContextData } from '@app/iam/bounded-context';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamFindBoundedContextHandler', () => {
  let handler: IamFindBoundedContextHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        IamFindBoundedContextHandler,
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

    handler = module.get<IamFindBoundedContextHandler>(
      IamFindBoundedContextHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('IamFindBoundedContextHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('IamFindBoundedContextHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return a boundedContext', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () => new Promise((resolve) => resolve(iamMockBoundedContextData[0])),
        );
      expect(await handler.main({}, {}, 'Europe/Madrid')).toBe(
        iamMockBoundedContextData[0],
      );
    });
  });
});
