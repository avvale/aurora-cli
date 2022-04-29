import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteTenantsCommandHandler } from './delete-tenants.command-handler';
import { DeleteTenantsCommand } from './delete-tenants.command';
import { DeleteTenantsService } from './delete-tenants.service';

describe('DeleteTenantsCommandHandler', () =>
{
    let commandHandler: DeleteTenantsCommandHandler;
    let service: DeleteTenantsService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteTenantsCommandHandler,
                {
                    provide: DeleteTenantsService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<DeleteTenantsCommandHandler>(DeleteTenantsCommandHandler);
        service         = module.get<DeleteTenantsService>(DeleteTenantsService);
    });

    describe('main', () =>
    {
        test('DeleteTenantsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () =>
        {
            expect(await commandHandler.execute(
                new DeleteTenantsCommand()
            )).toBe(undefined);
        });
    });
});