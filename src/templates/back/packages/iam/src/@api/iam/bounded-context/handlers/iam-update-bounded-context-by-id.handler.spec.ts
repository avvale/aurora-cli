/**
 * @aurora-generated
 * @source cliter/iam/bounded-context.aurora.yaml
 */
import { IamUpdateBoundedContextByIdInput } from '@api/graphql';
import { IamUpdateBoundedContextByIdHandler } from '@api/iam/bounded-context';
import { iamMockBoundedContextData } from '@app/iam/bounded-context';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdateBoundedContextByIdHandler', () => {
  let handler: IamUpdateBoundedContextByIdHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        IamUpdateBoundedContextByIdHandler,
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

    handler = module.get<IamUpdateBoundedContextByIdHandler>(
      IamUpdateBoundedContextByIdHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('IamUpdateBoundedContextByIdHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('IamUpdateBoundedContextByIdHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return a boundedContext updated', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () => new Promise((resolve) => resolve(iamMockBoundedContextData[0])),
        );
      expect(
        await handler.main(
          <IamUpdateBoundedContextByIdInput>iamMockBoundedContextData[0],
          {},
          'Europe/Madrid',
        ),
      ).toBe(iamMockBoundedContextData[0]);
    });
  });
});
