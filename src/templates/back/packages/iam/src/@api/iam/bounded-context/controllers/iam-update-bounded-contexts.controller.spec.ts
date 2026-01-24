/**
 * @aurora-generated
 * @source cliter/iam/bounded-context.aurora.yaml
 */
import {
  IamUpdateBoundedContextsController,
  IamUpdateBoundedContextsHandler,
} from '@api/iam/bounded-context';
import { iamMockBoundedContextData } from '@app/iam/bounded-context';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdateBoundedContextsController', () => {
  let controller: IamUpdateBoundedContextsController;
  let handler: IamUpdateBoundedContextsHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [IamUpdateBoundedContextsController],
      providers: [
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

    controller = module.get<IamUpdateBoundedContextsController>(
      IamUpdateBoundedContextsController,
    );
    handler = module.get<IamUpdateBoundedContextsHandler>(
      IamUpdateBoundedContextsHandler,
    );
  });

  describe('main', () => {
    test('IamUpdateBoundedContextsController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return a boundedContexts updated', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(iamMockBoundedContextData[0])),
        );
      expect(await controller.main(iamMockBoundedContextData[0])).toBe(
        iamMockBoundedContextData[0],
      );
    });
  });
});
