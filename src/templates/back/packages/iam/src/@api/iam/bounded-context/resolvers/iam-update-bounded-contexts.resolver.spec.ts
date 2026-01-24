/**
 * @aurora-generated
 * @source cliter/iam/bounded-context.aurora.yaml
 */
import { IamUpdateBoundedContextsInput } from '@api/graphql';
import {
  IamUpdateBoundedContextsHandler,
  IamUpdateBoundedContextsResolver,
} from '@api/iam/bounded-context';
import { iamMockBoundedContextData } from '@app/iam/bounded-context';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdateBoundedContextsResolver', () => {
  let resolver: IamUpdateBoundedContextsResolver;
  let handler: IamUpdateBoundedContextsHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        IamUpdateBoundedContextsResolver,
        {
          provide: IamUpdateBoundedContextsHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<IamUpdateBoundedContextsResolver>(
      IamUpdateBoundedContextsResolver,
    );
    handler = module.get<IamUpdateBoundedContextsHandler>(
      IamUpdateBoundedContextsHandler,
    );
  });

  test('IamUpdateBoundedContextsResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('IamUpdateBoundedContextsResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return a boundedContexts updated', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(iamMockBoundedContextData[0])),
        );
      expect(
        await resolver.main(
          <IamUpdateBoundedContextsInput>iamMockBoundedContextData[0],
        ),
      ).toBe(iamMockBoundedContextData[0]);
    });
  });
});
