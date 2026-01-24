import {
  IamCreateRolesAccountsController,
  IamCreateRolesAccountsHandler,
} from '@api/iam/role-account';
import { iamMockRoleAccountData } from '@app/iam/role-account';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamCreateRolesAccountsController', () => {
  let controller: IamCreateRolesAccountsController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IamCreateRolesAccountsController],
      providers: [
        {
          provide: IamCreateRolesAccountsHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<IamCreateRolesAccountsController>(
      IamCreateRolesAccountsController,
    );
  });

  describe('main', () => {
    test('IamCreateRolesAccountsController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return an iamMockRoleAccountData created', async () => {
      expect(await controller.main(iamMockRoleAccountData)).toBe(undefined);
    });
  });
});
