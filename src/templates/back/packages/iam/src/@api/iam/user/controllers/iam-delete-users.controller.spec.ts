import { IamDeleteUsersController, IamDeleteUsersHandler } from '@api/iam/user';
import { iamMockUserData } from '@app/iam/user';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamDeleteUsersController', () => {
  let controller: IamDeleteUsersController;
  let handler: IamDeleteUsersHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [IamDeleteUsersController],
      providers: [
        {
          provide: IamDeleteUsersHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<IamDeleteUsersController>(IamDeleteUsersController);
    handler = module.get<IamDeleteUsersHandler>(IamDeleteUsersHandler);
  });

  describe('main', () => {
    test('IamDeleteUsersController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return an iamMockUserData deleted', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(iamMockUserData)),
        );
      expect(await controller.main()).toBe(iamMockUserData);
    });
  });
});
