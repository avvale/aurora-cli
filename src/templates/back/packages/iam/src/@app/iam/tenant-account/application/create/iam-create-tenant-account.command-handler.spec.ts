import {
  IamCreateTenantAccountCommand,
  iamMockTenantAccountData,
} from '@app/iam/tenant-account';
import { Test, TestingModule } from '@nestjs/testing';
import { IamCreateTenantAccountCommandHandler } from './iam-create-tenant-account.command-handler';
import { IamCreateTenantAccountService } from './iam-create-tenant-account.service';

describe('IamCreateTenantAccountCommandHandler', () => {
  let commandHandler: IamCreateTenantAccountCommandHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IamCreateTenantAccountCommandHandler,
        {
          provide: IamCreateTenantAccountService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    commandHandler = module.get<IamCreateTenantAccountCommandHandler>(
      IamCreateTenantAccountCommandHandler,
    );
  });

  describe('main', () => {
    test('CreateTenantAccountCommandHandler should be defined', () => {
      expect(commandHandler).toBeDefined();
    });

    test('should create the values objects and pass them as parameters to the IamCreateTenantAccountService', async () => {
      expect(
        await commandHandler.execute(
          new IamCreateTenantAccountCommand(
            {
              tenantId: iamMockTenantAccountData[0].tenantId,
              accountId: iamMockTenantAccountData[0].accountId,
            },
            { timezone: process.env.TZ },
          ),
        ),
      ).toBe(undefined);
    });
  });
});
