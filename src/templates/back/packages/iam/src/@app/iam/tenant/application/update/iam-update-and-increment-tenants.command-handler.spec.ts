import { iamMockTenantData, IamUpdateAndIncrementTenantsCommand } from '@app/iam/tenant';
import { IamUpdateAndIncrementTenantsCommandHandler } from '@app/iam/tenant/application/update/iam-update-and-increment-tenants.command-handler';
import { IamUpdateAndIncrementTenantsService } from '@app/iam/tenant/application/update/iam-update-and-increment-tenants.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdateAndIncrementTenantsCommandHandler', () =>
{
    let commandHandler: IamUpdateAndIncrementTenantsCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamUpdateAndIncrementTenantsCommandHandler,
                {
                    provide : IamUpdateAndIncrementTenantsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<IamUpdateAndIncrementTenantsCommandHandler>(IamUpdateAndIncrementTenantsCommandHandler);
    });

    describe('main', () =>
    {
        test('UpdateAndIncrementTenantsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an tenants updated', async () =>
        {
            /* eslint-disable key-spacing */
            expect(await commandHandler.execute(
                new IamUpdateAndIncrementTenantsCommand(
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
            /* eslint-enable key-spacing */
        });
    });
});
