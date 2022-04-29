import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { tenants } from '../../../../../@apps/iam/tenant/infrastructure/seeds/tenant.seed';
import { CreateTenantCommandHandler } from './create-tenant.command-handler';
import { CreateTenantCommand } from './create-tenant.command';
import { CreateTenantService } from './create-tenant.service';

describe('CreateTenantCommandHandler', () =>
{
    let commandHandler: CreateTenantCommandHandler;
    let service: CreateTenantService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateTenantCommandHandler,
                {
                    provide : CreateTenantService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        commandHandler  = module.get<CreateTenantCommandHandler>(CreateTenantCommandHandler);
        service         = module.get<CreateTenantService>(CreateTenantService);
    });

    describe('main', () =>
    {
        test('CreateTenantCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the values objects and pass them as parameters to the CreateTenantService', async () =>
        {
            expect(await commandHandler.execute(
                new CreateTenantCommand(
                    {
                        id: tenants[0].id,
                        name: tenants[0].name,
                        code: tenants[0].code,
                        logo: tenants[0].logo,
                        isActive: tenants[0].isActive,
                        data: tenants[0].data,
                        accountIds: tenants[0].accountIds,
                    },
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});