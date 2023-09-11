import { iamMockTenantAccountData, IamUpdateTenantAccountByIdCommand } from '@app/iam/tenant-account';
import { IamUpdateTenantAccountByIdCommandHandler } from '@app/iam/tenant-account/application/update/iam-update-tenant-account-by-id.command-handler';
import { IamUpdateTenantAccountByIdService } from '@app/iam/tenant-account/application/update/iam-update-tenant-account-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdateTenantAccountByIdCommandHandler', () =>
{
    let commandHandler: IamUpdateTenantAccountByIdCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamUpdateTenantAccountByIdCommandHandler,
                {
                    provide : IamUpdateTenantAccountByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<IamUpdateTenantAccountByIdCommandHandler>(IamUpdateTenantAccountByIdCommandHandler);
    });

    describe('main', () =>
    {
        test('UpdateTenantAccountByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an tenantAccount created', async () =>
        {
            expect(await commandHandler.execute(
                new IamUpdateTenantAccountByIdCommand(
                    {
                        tenantId: iamMockTenantAccountData[0].tenantId,
                        accountId: iamMockTenantAccountData[0].accountId,
                    },
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
