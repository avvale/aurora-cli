import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteTenantByIdCommandHandler } from './delete-tenant-by-id.command-handler';
import { tenants } from '../../../../../@apps/iam/tenant/infrastructure/seeds/tenant.seed';
import { DeleteTenantByIdCommand } from './delete-tenant-by-id.command';
import { DeleteTenantByIdService } from './delete-tenant-by-id.service';

describe('DeleteTenantByIdCommandHandler', () =>
{
    let commandHandler: DeleteTenantByIdCommandHandler;
    let service: DeleteTenantByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteTenantByIdCommandHandler,
                {
                    provide: DeleteTenantByIdService,
                    useValue: {
                        main: () => {},
                    }
                },
            ],
        }).compile();

        commandHandler  = module.get<DeleteTenantByIdCommandHandler>(DeleteTenantByIdCommandHandler);
        service         = module.get<DeleteTenantByIdService>(DeleteTenantByIdService);
    });

    describe('main', () =>
    {
        test('DeleteTenantByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the DeleteTenantByIdService', async () =>
        {
            expect(await commandHandler.execute(
                new DeleteTenantByIdCommand(
                    tenants[0].id,
                )
            )).toBe(undefined);
        });
    });
});