import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { tenants } from '@app/iam/tenant/infrastructure/seeds/tenant.seed';
import { UpdateTenantByIdCommandHandler } from './update-tenant-by-id.command-handler';
import { UpdateTenantByIdCommand } from './update-tenant-by-id.command';
import { UpdateTenantByIdService } from './update-tenant-by-id.service';

describe('UpdateTenantByIdCommandHandler', () =>
{
    let commandHandler: UpdateTenantByIdCommandHandler;
    let service: UpdateTenantByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateTenantByIdCommandHandler,
                {
                    provide : UpdateTenantByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler  = module.get<UpdateTenantByIdCommandHandler>(UpdateTenantByIdCommandHandler);
        service         = module.get<UpdateTenantByIdService>(UpdateTenantByIdService);
    });

    describe('main', () =>
    {
        test('UpdateTenantByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an tenant created', async () =>
        {
            expect(await commandHandler.execute(
                new UpdateTenantByIdCommand(
                    {
                        id: tenants[0].id,
                        name: tenants[0].name,
                        code: tenants[0].code,
                        logo: tenants[0].logo,
                        isActive: tenants[0].isActive,
                        meta: tenants[0].meta,
                        accountIds: tenants[0].accountIds,
                    },
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});