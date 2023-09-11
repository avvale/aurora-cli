import { iamMockTenantAccountData, IamUpsertTenantAccountCommand } from '@app/iam/tenant-account';
import { IamUpsertTenantAccountCommandHandler } from '@app/iam/tenant-account/application/upsert/iam-upsert-tenant-account.command-handler';
import { IamUpsertTenantAccountService } from '@app/iam/tenant-account/application/upsert/iam-upsert-tenant-account.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpsertTenantAccountCommandHandler', () =>
{
    let commandHandler: IamUpsertTenantAccountCommandHandler;
    let service: IamUpsertTenantAccountService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamUpsertTenantAccountCommandHandler,
                {
                    provide : IamUpsertTenantAccountService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<IamUpsertTenantAccountCommandHandler>(IamUpsertTenantAccountCommandHandler);
        service = module.get<IamUpsertTenantAccountService>(IamUpsertTenantAccountService);
    });

    describe('main', () =>
    {
        test('UpsertTenantAccountCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should upsert the values objects and pass them as parameters to the IamUpsertTenantAccountService', async () =>
        {
            expect(await commandHandler.execute(
                new IamUpsertTenantAccountCommand(
                    {
                        tenantId: iamMockTenantAccountData[0].tenantId,
                        accountId: iamMockTenantAccountData[0].accountId,
                    },
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
