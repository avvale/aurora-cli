import {
  IamUpdateRoleAccountByIdController,
  IamUpdateRoleAccountByIdHandler,
} from '@api/iam/role-account';
import { iamMockRoleAccountData } from '@app/iam/role-account';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdateRoleAccountByIdController', () => {
  let controller: IamUpdateRoleAccountByIdController;
  let handler: IamUpdateRoleAccountByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [IamUpdateRoleAccountByIdController],
      providers: [
        {
          provide: IamUpdateRoleAccountByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<IamUpdateRoleAccountByIdController>(
      IamUpdateRoleAccountByIdController,
    );
    handler = module.get<IamUpdateRoleAccountByIdHandler>(
      IamUpdateRoleAccountByIdHandler,
    );
  });

  describe('main', () => {
    test('IamUpdateRoleAccountByIdController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return a roleAccount updated', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(iamMockRoleAccountData[0])),
        );
      expect(await controller.main(iamMockRoleAccountData[0])).toBe(
        iamMockRoleAccountData[0],
      );
    });
  });
});
