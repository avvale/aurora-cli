/**
 * @aurora-generated
 * @source cliter/iam/bounded-context.aurora.yaml
 */
import { IamGetBoundedContextsHandler } from '@api/iam/bounded-context';
import { iamMockBoundedContextData } from '@app/iam/bounded-context';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamGetBoundedContextsHandler', () => {
  let handler: IamGetBoundedContextsHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        IamGetBoundedContextsHandler,
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

    handler = module.get<IamGetBoundedContextsHandler>(
      IamGetBoundedContextsHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('IamGetBoundedContextsHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('IamGetBoundedContextsHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return a iamMockBoundedContextData', async () => {
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
