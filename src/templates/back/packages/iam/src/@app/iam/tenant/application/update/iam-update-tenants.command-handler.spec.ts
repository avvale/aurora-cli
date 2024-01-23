import { iamMockTenantData, IamUpdateTenantsCommand } from '@app/iam/tenant';
import { IamUpdateTenantsCommandHandler } from '@app/iam/tenant/application/update/iam-update-tenants.command-handler';
import { IamUpdateTenantsService } from '@app/iam/tenant/application/update/iam-update-tenants.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdateTenantsCommandHandler', () =>
{
    let commandHandler: IamUpdateTenantsCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamUpdateTenantsCommandHandler,
                {
                    provide : IamUpdateTenantsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<IamUpdateTenantsCommandHandler>(IamUpdateTenantsCommandHandler);
    });

    describe('main', () =>
    {
        test('UpdateTenantsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an tenants updated', async () =>
        {
            expect(await commandHandler.execute(
                new IamUpdateTenantsCommand(
                    {
                        id: iamMockTenantData[0].id,
                        parentId: iamMockTenantData[0].parentId,
                        name: iamMockTenantData[0].name,
                        code: iamMockTenantData[0].code,
                        logo: iamMockTenantData[0].logo,
                        isActive: iamMockTenantData[0].isActive,
                        meta: iamMockTenantData[0].meta,
                        accountIds: iamMockTenantData[0].accountIds,
                    },
                    {},
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
