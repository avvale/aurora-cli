import { iamMockAccountData, IamUpdateAndIncrementAccountsCommand } from '@app/iam/account';
import { IamUpdateAndIncrementAccountsCommandHandler } from '@app/iam/account/application/update/iam-update-and-increment-accounts.command-handler';
import { IamUpdateAndIncrementAccountsService } from '@app/iam/account/application/update/iam-update-and-increment-accounts.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdateAndIncrementAccountsCommandHandler', () =>
{
    let commandHandler: IamUpdateAndIncrementAccountsCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamUpdateAndIncrementAccountsCommandHandler,
                {
                    provide : IamUpdateAndIncrementAccountsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<IamUpdateAndIncrementAccountsCommandHandler>(IamUpdateAndIncrementAccountsCommandHandler);
    });

    describe('main', () =>
    {
        test('UpdateAndIncrementAccountsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an accounts updated', async () =>
        {
            /* eslint-disable key-spacing */
            expect(await commandHandler.execute(
                new IamUpdateAndIncrementAccountsCommand(
                    {
                        id: iamMockAccountData[0].id,
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
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
            /* eslint-enable key-spacing */
        });
    });
});
