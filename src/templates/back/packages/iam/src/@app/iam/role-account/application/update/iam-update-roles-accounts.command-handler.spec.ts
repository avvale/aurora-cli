import {
  iamMockRoleAccountData,
  IamUpdateRolesAccountsCommand,
} from '@app/iam/role-account';
import { IamUpdateRolesAccountsCommandHandler } from '@app/iam/role-account/application/update/iam-update-roles-accounts.command-handler';
import { IamUpdateRolesAccountsService } from '@app/iam/role-account/application/update/iam-update-roles-accounts.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdateRolesAccountsCommandHandler', () => {
  let commandHandler: IamUpdateRolesAccountsCommandHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IamUpdateRolesAccountsCommandHandler,
        {
          provide: IamUpdateRolesAccountsService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    commandHandler = module.get<IamUpdateRolesAccountsCommandHandler>(
      IamUpdateRolesAccountsCommandHandler,
    );
  });

  describe('main', () => {
    test('UpdateRolesAccountsCommandHandler should be defined', () => {
      expect(commandHandler).toBeDefined();
    });

    test('should return an rolesAccounts updated', async () => {
      expect(
        await commandHandler.execute(
          new IamUpdateRolesAccountsCommand(
            {
              roleId: iamMockRoleAccountData[0].roleId,
              accountId: iamMockRoleAccountData[0].accountId,
            },
            {},
            {},
            { timezone: process.env.TZ },
          ),
        ),
      ).toBe(undefined);
    });
  });
});
