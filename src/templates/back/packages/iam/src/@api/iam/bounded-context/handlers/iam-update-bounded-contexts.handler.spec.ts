/**
 * @aurora-generated
 * @source cliter/iam/bounded-context.aurora.yaml
 */
import { IamUpdateBoundedContextsInput } from '@api/graphql';
import { IamUpdateBoundedContextsHandler } from '@api/iam/bounded-context';
import { iamMockBoundedContextData } from '@app/iam/bounded-context';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdateBoundedContextsHandler', () => {
  let handler: IamUpdateBoundedContextsHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        IamUpdateBoundedContextsHandler,
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

    handler = module.get<IamUpdateBoundedContextsHandler>(
      IamUpdateBoundedContextsHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('IamUpdateBoundedContextsHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('IamUpdateBoundedContextsHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return a boundedContexts updated', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () => new Promise((resolve) => resolve(iamMockBoundedContextData[0])),
        );
      expect(
        await handler.main(
          <IamUpdateBoundedContextsInput>iamMockBoundedContextData[0],
          {},
          {},
          'Europe/Madrid',
        ),
      ).toBe(iamMockBoundedContextData[0]);
    });
  });
});
