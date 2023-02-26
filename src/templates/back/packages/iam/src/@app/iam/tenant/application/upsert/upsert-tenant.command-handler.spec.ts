import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { tenants } from '@app/iam/tenant/infrastructure/mock/mock-tenant.data';
import { UpsertTenantCommandHandler } from './upsert-tenant.command-handler';
import { UpsertTenantCommand } from './upsert-tenant.command';
import { UpsertTenantService } from './upsert-tenant.service';

describe('UpsertTenantCommandHandler', () =>
{
    let commandHandler: UpsertTenantCommandHandler;
    let service: UpsertTenantService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpsertTenantCommandHandler,
                {
                    provide : UpsertTenantService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler  = module.get<UpsertTenantCommandHandler>(UpsertTenantCommandHandler);
        service         = module.get<UpsertTenantService>(UpsertTenantService);
    });

    describe('main', () =>
    {
        test('UpsertTenantCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should upsert the values objects and pass them as parameters to the UpsertTenantService', async () =>
        {
            expect(await commandHandler.execute(
                new UpsertTenantCommand(
                    {
                        id: tenants[0].id,
                        name: tenants[0].name,
                        code: tenants[0].code,
                        logo: tenants[0].logo,
                        isActive: tenants[0].isActive,
                        meta: tenants[0].meta,
                        accountIds: tenants[0].accountIds,
                    },
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});