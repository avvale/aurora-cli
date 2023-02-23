import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { tenants } from '@app/iam/tenant/infrastructure/seeds/tenant.seed';
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
                    },
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});