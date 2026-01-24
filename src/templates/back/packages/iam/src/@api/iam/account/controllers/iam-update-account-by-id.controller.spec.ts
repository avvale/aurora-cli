import {
  IamUpdateAccountByIdController,
  IamUpdateAccountByIdHandler,
} from '@api/iam/account';
import { iamMockAccountData } from '@app/iam/account';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdateAccountByIdController', () => {
  let controller: IamUpdateAccountByIdController;
  let handler: IamUpdateAccountByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [IamUpdateAccountByIdController],
      providers: [
        {
          provide: IamUpdateAccountByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<IamUpdateAccountByIdController>(
      IamUpdateAccountByIdController,
    );
    handler = module.get<IamUpdateAccountByIdHandler>(
      IamUpdateAccountByIdHandler,
    );
  });

  describe('main', () => {
    test('IamUpdateAccountByIdController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return a account updated', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(iamMockAccountData[0])),
        );
      expect(await controller.main(iamMockAccountData[0])).toBe(
        iamMockAccountData[0],
      );
    });
  });
});
