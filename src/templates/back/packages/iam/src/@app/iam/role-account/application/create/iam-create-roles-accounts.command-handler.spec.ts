import {
  IamCreateRolesAccountsCommand,
  iamMockRoleAccountData,
} from '@app/iam/role-account';
import { IamCreateRolesAccountsCommandHandler } from '@app/iam/role-account/application/create/iam-create-roles-accounts.command-handler';
import { IamCreateRolesAccountsService } from '@app/iam/role-account/application/create/iam-create-roles-accounts.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('iamCreateRolesAccountsCommandHandler', () => {
  let commandHandler: IamCreateRolesAccountsCommandHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IamCreateRolesAccountsCommandHandler,
        {
          provide: IamCreateRolesAccountsService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    commandHandler = module.get<IamCreateRolesAccountsCommandHandler>(
      IamCreateRolesAccountsCommandHandler,
    );
  });

  describe('main', () => {
    test('IamCreateRolesAccountsCommandHandler should be defined', () => {
      expect(commandHandler).toBeDefined();
    });

    test('should return IamMockRoleAccountData created', async () => {
      expect(
        await commandHandler.execute(
          new IamCreateRolesAccountsCommand(iamMockRoleAccountData, {
            timezone: process.env.TZ,
          }),
        ),
      ).toBe(undefined);
    });
  });
});
