import { IamFindUserController, IamFindUserHandler } from '@api/iam/user';
import { iamMockUserData } from '@app/iam/user';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamFindUserController', () => {
  let controller: IamFindUserController;
  let handler: IamFindUserHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [IamFindUserController],
      providers: [
        {
          provide: IamFindUserHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<IamFindUserController>(IamFindUserController);
    handler = module.get<IamFindUserHandler>(IamFindUserHandler);
  });

  describe('main', () => {
    test('IamFindUserController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return a user', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(iamMockUserData[0])),
        );
      expect(await controller.main()).toBe(iamMockUserData[0]);
    });
  });
});
