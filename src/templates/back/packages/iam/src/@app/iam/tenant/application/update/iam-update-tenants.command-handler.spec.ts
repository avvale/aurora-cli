import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { iamMockTenantData } from '@app/iam/tenant/infrastructure/mock/iam-mock-tenant.data';
import { IamUpdateTenantsCommandHandler } from './iam-update-tenants.command-handler';
import { IamUpdateTenantsCommand } from './iam-update-tenants.command';
import { IamUpdateTenantsService } from './iam-update-tenants.service';

describe('IamUpdateTenantsCommandHandler', () =>
{
    let commandHandler: IamUpdateTenantsCommandHandler;
    let service: IamUpdateTenantsService;

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
        service = module.get<IamUpdateTenantsService>(IamUpdateTenantsService);
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
