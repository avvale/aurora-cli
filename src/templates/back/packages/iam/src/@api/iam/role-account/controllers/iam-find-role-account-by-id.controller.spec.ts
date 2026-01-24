import {
  IamFindRoleAccountByIdController,
  IamFindRoleAccountByIdHandler,
} from '@api/iam/role-account';
import { iamMockRoleAccountData } from '@app/iam/role-account';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamFindRoleAccountByIdController', () => {
  let controller: IamFindRoleAccountByIdController;
  let handler: IamFindRoleAccountByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [IamFindRoleAccountByIdController],
      providers: [
        {
          provide: IamFindRoleAccountByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<IamFindRoleAccountByIdController>(
      IamFindRoleAccountByIdController,
    );
    handler = module.get<IamFindRoleAccountByIdHandler>(
      IamFindRoleAccountByIdHandler,
    );
  });

  describe('main', () => {
    test('IamFindRoleAccountByIdController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return an roleAccount by id', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(iamMockRoleAccountData[0])),
        );
      expect(await controller.main(iamMockRoleAccountData[0].id)).toBe(
        iamMockRoleAccountData[0],
      );
    });
  });
});
