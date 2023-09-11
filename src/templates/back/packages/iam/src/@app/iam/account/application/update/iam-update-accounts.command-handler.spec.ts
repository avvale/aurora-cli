import { iamMockAccountData, IamUpdateAccountsCommand } from '@app/iam/account';
import { IamUpdateAccountsCommandHandler } from '@app/iam/account/application/update/iam-update-accounts.command-handler';
import { IamUpdateAccountsService } from '@app/iam/account/application/update/iam-update-accounts.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdateAccountsCommandHandler', () =>
{
    let commandHandler: IamUpdateAccountsCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamUpdateAccountsCommandHandler,
                {
                    provide : IamUpdateAccountsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<IamUpdateAccountsCommandHandler>(IamUpdateAccountsCommandHandler);
    });

    describe('main', () =>
    {
        test('UpdateAccountsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an accounts updated', async () =>
        {
            expect(await commandHandler.execute(
                new IamUpdateAccountsCommand(
                    {
                        id: iamMockAccountData[0].id,
                        type: iamMockAccountData[0].type,
                        code: iamMockAccountData[0].code,
                        email: iamMockAccountData[0].email,
                        isActive: iamMockAccountData[0].isActive,
                        clientId: iamMockAccountData[0].clientId,
                        scopes: iamMockAccountData[0].scopes,
                        dApplicationCodes: iamMockAccountData[0].dApplicationCodes,
                        dPermissions: iamMockAccountData[0].dPermissions,
                        dTenants: iamMockAccountData[0].dTenants,
                        meta: iamMockAccountData[0].meta,
                        roleIds: iamMockAccountData[0].roleIds,
                        tenantIds: iamMockAccountData[0].tenantIds,
                    },
                    {},
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
