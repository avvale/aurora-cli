import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { tenants } from '../../../../../@apps/iam/tenant/infrastructure/seeds/tenant.seed';
import { UpdateTenantCommandHandler } from './update-tenant.command-handler';
import { UpdateTenantCommand } from './update-tenant.command';
import { UpdateTenantService } from './update-tenant.service';

describe('UpdateTenantCommandHandler', () =>
{
    let commandHandler: UpdateTenantCommandHandler;
    let service: UpdateTenantService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateTenantCommandHandler,
                {
                    provide : UpdateTenantService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        commandHandler  = module.get<UpdateTenantCommandHandler>(UpdateTenantCommandHandler);
        service         = module.get<UpdateTenantService>(UpdateTenantService);
    });

    describe('main', () =>
    {
        test('UpdateTenantCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an tenant created', async () =>
        {
            expect(await commandHandler.execute(
                new UpdateTenantCommand(
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
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});