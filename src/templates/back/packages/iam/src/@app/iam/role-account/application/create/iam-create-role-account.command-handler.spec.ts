import {
  IamCreateRoleAccountCommand,
  iamMockRoleAccountData,
} from '@app/iam/role-account';
import { Test, TestingModule } from '@nestjs/testing';
import { IamCreateRoleAccountCommandHandler } from './iam-create-role-account.command-handler';
import { IamCreateRoleAccountService } from './iam-create-role-account.service';

describe('IamCreateRoleAccountCommandHandler', () => {
  let commandHandler: IamCreateRoleAccountCommandHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IamCreateRoleAccountCommandHandler,
        {
          provide: IamCreateRoleAccountService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    commandHandler = module.get<IamCreateRoleAccountCommandHandler>(
      IamCreateRoleAccountCommandHandler,
    );
  });

  describe('main', () => {
    test('CreateRoleAccountCommandHandler should be defined', () => {
      expect(commandHandler).toBeDefined();
    });

    test('should create the values objects and pass them as parameters to the IamCreateRoleAccountService', async () => {
      expect(
        await commandHandler.execute(
          new IamCreateRoleAccountCommand(
            {
              roleId: iamMockRoleAccountData[0].roleId,
              accountId: iamMockRoleAccountData[0].accountId,
            },
            { timezone: process.env.TZ },
          ),
        ),
      ).toBe(undefined);
    });
  });
});
