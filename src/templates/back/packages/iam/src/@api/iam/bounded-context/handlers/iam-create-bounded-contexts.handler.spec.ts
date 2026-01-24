/**
 * @aurora-generated
 * @source cliter/iam/bounded-context.aurora.yaml
 */
import { IamCreateBoundedContextsHandler } from '@api/iam/bounded-context';
import { iamMockBoundedContextData } from '@app/iam/bounded-context';
import { ICommandBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamCreateBoundedContextsHandler', () => {
  let handler: IamCreateBoundedContextsHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IamCreateBoundedContextsHandler,
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

    handler = module.get<IamCreateBoundedContextsHandler>(
      IamCreateBoundedContextsHandler,
    );
  });

  describe('main', () => {
    test('IamCreateBoundedContextsHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return an iamMockBoundedContextData created', async () => {
      expect(await handler.main(iamMockBoundedContextData)).toBe(true);
    });
  });
});
