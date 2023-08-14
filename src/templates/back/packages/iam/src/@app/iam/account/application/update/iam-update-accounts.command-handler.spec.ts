import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { iamMockAccountData } from '@app/iam/account/infrastructure/mock/iam-mock-account.data';
import { IamUpdateAccountsCommandHandler } from './iam-update-accounts.command-handler';
import { IamUpdateAccountsCommand } from './iam-update-accounts.command';
import { IamUpdateAccountsService } from './iam-update-accounts.service';

describe('IamUpdateAccountsCommandHandler', () =>
{
    let commandHandler: IamUpdateAccountsCommandHandler;
    let service: IamUpdateAccountsService;

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
        service = module.get<IamUpdateAccountsService>(IamUpdateAccountsService);
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
