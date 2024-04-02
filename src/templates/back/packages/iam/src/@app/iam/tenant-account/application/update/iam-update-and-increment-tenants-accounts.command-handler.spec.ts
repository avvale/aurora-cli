import { iamMockTenantAccountData, IamUpdateAndIncrementTenantsAccountsCommand } from '@app/iam/tenant-account';
import { IamUpdateAndIncrementTenantsAccountsCommandHandler } from '@app/iam/tenant-account/application/update/iam-update-and-increment-tenants-accounts.command-handler';
import { IamUpdateAndIncrementTenantsAccountsService } from '@app/iam/tenant-account/application/update/iam-update-and-increment-tenants-accounts.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdateAndIncrementTenantsAccountsCommandHandler', () =>
{
    let commandHandler: IamUpdateAndIncrementTenantsAccountsCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamUpdateAndIncrementTenantsAccountsCommandHandler,
                {
                    provide : IamUpdateAndIncrementTenantsAccountsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<IamUpdateAndIncrementTenantsAccountsCommandHandler>(IamUpdateAndIncrementTenantsAccountsCommandHandler);
    });

    describe('main', () =>
    {
        test('UpdateAndIncrementTenantsAccountsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an tenantsAccounts updated', async () =>
        {
            /* eslint-disable key-spacing */
            expect(await commandHandler.execute(
                new IamUpdateAndIncrementTenantsAccountsCommand(
                    {
                        tenantId: iamMockTenantAccountData[0].tenantId,
                        accountId: iamMockTenantAccountData[0].accountId,
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
