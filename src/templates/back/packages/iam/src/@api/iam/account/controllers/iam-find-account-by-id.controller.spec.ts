import {
  IamFindAccountByIdController,
  IamFindAccountByIdHandler,
} from '@api/iam/account';
import { iamMockAccountData } from '@app/iam/account';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamFindAccountByIdController', () => {
  let controller: IamFindAccountByIdController;
  let handler: IamFindAccountByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [IamFindAccountByIdController],
      providers: [
        {
          provide: IamFindAccountByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<IamFindAccountByIdController>(
      IamFindAccountByIdController,
    );
    handler = module.get<IamFindAccountByIdHandler>(IamFindAccountByIdHandler);
  });

  describe('main', () => {
    test('IamFindAccountByIdController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return an account by id', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(iamMockAccountData[0])),
        );
      expect(await controller.main(iamMockAccountData[0].id)).toBe(
        iamMockAccountData[0],
      );
    });
  });
});
