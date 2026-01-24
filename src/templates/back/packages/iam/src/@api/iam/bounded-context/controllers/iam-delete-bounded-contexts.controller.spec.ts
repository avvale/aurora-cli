/**
 * @aurora-generated
 * @source cliter/iam/bounded-context.aurora.yaml
 */
import {
  IamDeleteBoundedContextsController,
  IamDeleteBoundedContextsHandler,
} from '@api/iam/bounded-context';
import { iamMockBoundedContextData } from '@app/iam/bounded-context';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamDeleteBoundedContextsController', () => {
  let controller: IamDeleteBoundedContextsController;
  let handler: IamDeleteBoundedContextsHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [IamDeleteBoundedContextsController],
      providers: [
        {
          provide: IamDeleteBoundedContextsHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<IamDeleteBoundedContextsController>(
      IamDeleteBoundedContextsController,
    );
    handler = module.get<IamDeleteBoundedContextsHandler>(
      IamDeleteBoundedContextsHandler,
    );
  });

  describe('main', () => {
    test('IamDeleteBoundedContextsController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return an iamMockBoundedContextData deleted', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(iamMockBoundedContextData)),
        );
      expect(await controller.main()).toBe(iamMockBoundedContextData);
    });
  });
});
