import {
  IamGetRolesAccountsController,
  IamGetRolesAccountsHandler,
} from '@api/iam/role-account';
import { iamMockRoleAccountData } from '@app/iam/role-account';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamGetRolesAccountsController', () => {
  let controller: IamGetRolesAccountsController;
  let handler: IamGetRolesAccountsHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [IamGetRolesAccountsController],
      providers: [
        {
          provide: IamGetRolesAccountsHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<IamGetRolesAccountsController>(
      IamGetRolesAccountsController,
    );
    handler = module.get<IamGetRolesAccountsHandler>(
      IamGetRolesAccountsHandler,
    );
  });

  describe('main', () => {
    test('IamGetRolesAccountsController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return a iamMockRoleAccountData', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(iamMockRoleAccountData)),
        );
      expect(await controller.main()).toBe(iamMockRoleAccountData);
    });
  });
});
