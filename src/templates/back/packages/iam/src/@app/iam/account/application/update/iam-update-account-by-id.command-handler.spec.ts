import {
  iamMockAccountData,
  IamUpdateAccountByIdCommand,
} from '@app/iam/account';
import { IamUpdateAccountByIdCommandHandler } from '@app/iam/account/application/update/iam-update-account-by-id.command-handler';
import { IamUpdateAccountByIdService } from '@app/iam/account/application/update/iam-update-account-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdateAccountByIdCommandHandler', () => {
  let commandHandler: IamUpdateAccountByIdCommandHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IamUpdateAccountByIdCommandHandler,
        {
          provide: IamUpdateAccountByIdService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    commandHandler = module.get<IamUpdateAccountByIdCommandHandler>(
      IamUpdateAccountByIdCommandHandler,
    );
  });

  describe('main', () => {
    test('UpdateAccountByIdCommandHandler should be defined', () => {
      expect(commandHandler).toBeDefined();
    });

    test('should return an account created', async () => {
      expect(
        await commandHandler.execute(
          new IamUpdateAccountByIdCommand(
            {
              id: iamMockAccountData[0].id,
              rowId: iamMockAccountData[0].rowId,
              type: iamMockAccountData[0].type,
              code: iamMockAccountData[0].code,
              email: iamMockAccountData[0].email,
              username: iamMockAccountData[0].username,
              isActive: iamMockAccountData[0].isActive,
              clientId: iamMockAccountData[0].clientId,
              tags: iamMockAccountData[0].tags,
              scopes: iamMockAccountData[0].scopes,
              dApplicationCodes: iamMockAccountData[0].dApplicationCodes,
              dPermissions: iamMockAccountData[0].dPermissions,
              dTenants: iamMockAccountData[0].dTenants,
              meta: iamMockAccountData[0].meta,
              roleIds: iamMockAccountData[0].roleIds,
              tenantIds: iamMockAccountData[0].tenantIds,
            },
            {},
            { timezone: process.env.TZ },
          ),
        ),
      ).toBe(undefined);
    });
  });
});
