import { IamUpdateUsersController, IamUpdateUsersHandler } from '@api/iam/user';
import { iamMockUserData } from '@app/iam/user';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdateUsersController', () => {
  let controller: IamUpdateUsersController;
  let handler: IamUpdateUsersHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [IamUpdateUsersController],
      providers: [
        {
          provide: IamUpdateUsersHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<IamUpdateUsersController>(IamUpdateUsersController);
    handler = module.get<IamUpdateUsersHandler>(IamUpdateUsersHandler);
  });

  describe('main', () => {
    test('IamUpdateUsersController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return a users updated', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(iamMockUserData[0])),
        );
      expect(await controller.main(iamMockUserData[0])).toBe(
        iamMockUserData[0],
      );
    });
  });
});
