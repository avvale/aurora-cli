import { IamCreateTenantsAccountsCommand, iamMockTenantAccountData } from '@app/iam/tenant-account';
import { IamCreateTenantsAccountsCommandHandler } from '@app/iam/tenant-account/application/create/iam-create-tenants-accounts.command-handler';
import { IamCreateTenantsAccountsService } from '@app/iam/tenant-account/application/create/iam-create-tenants-accounts.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('iamCreateTenantsAccountsCommandHandler', () =>
{
    let commandHandler: IamCreateTenantsAccountsCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamCreateTenantsAccountsCommandHandler,
                {
                    provide : IamCreateTenantsAccountsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<IamCreateTenantsAccountsCommandHandler>(IamCreateTenantsAccountsCommandHandler);
    });

    describe('main', () =>
    {
        test('IamCreateTenantsAccountsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return IamMockTenantAccountData created', async () =>
        {
            expect(await commandHandler.execute(
                new IamCreateTenantsAccountsCommand(
                    iamMockTenantAccountData,
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
