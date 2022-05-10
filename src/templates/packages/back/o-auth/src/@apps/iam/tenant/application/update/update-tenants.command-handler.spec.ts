import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { tenants } from '@apps/iam/tenant/infrastructure/seeds/tenant.seed';
import { UpdateTenantsCommandHandler } from './update-tenants.command-handler';
import { UpdateTenantsCommand } from './update-tenants.command';
import { UpdateTenantsService } from './update-tenants.service';

describe('UpdateTenantsCommandHandler', () =>
{
    let commandHandler: UpdateTenantsCommandHandler;
    let service: UpdateTenantsService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateTenantsCommandHandler,
                {
                    provide : UpdateTenantsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler  = module.get<UpdateTenantsCommandHandler>(UpdateTenantsCommandHandler);
        service         = module.get<UpdateTenantsService>(UpdateTenantsService);
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
                new UpdateTenantsCommand(
                    {
                        id: tenants[0].id,
                        name: tenants[0].name,
                        code: tenants[0].code,
                        logo: tenants[0].logo,
                        isActive: tenants[0].isActive,
                        data: tenants[0].data,
                        accountIds: tenants[0].accountIds,
                    },
                    {},
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});