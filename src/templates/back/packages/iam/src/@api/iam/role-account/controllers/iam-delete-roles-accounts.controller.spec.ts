import {
  IamDeleteRolesAccountsController,
  IamDeleteRolesAccountsHandler,
} from '@api/iam/role-account';
import { iamMockRoleAccountData } from '@app/iam/role-account';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamDeleteRolesAccountsController', () => {
  let controller: IamDeleteRolesAccountsController;
  let handler: IamDeleteRolesAccountsHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [IamDeleteRolesAccountsController],
      providers: [
        {
          provide: IamDeleteRolesAccountsHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<IamDeleteRolesAccountsController>(
      IamDeleteRolesAccountsController,
    );
    handler = module.get<IamDeleteRolesAccountsHandler>(
      IamDeleteRolesAccountsHandler,
    );
  });

  describe('main', () => {
    test('IamDeleteRolesAccountsController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return an iamMockRoleAccountData deleted', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(iamMockRoleAccountData)),
        );
      expect(await controller.main()).toBe(iamMockRoleAccountData);
    });
  });
});
