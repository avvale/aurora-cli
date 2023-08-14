import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamDeleteTenantsCommandHandler } from './iam-delete-tenants.command-handler';
import { IamDeleteTenantsCommand } from './iam-delete-tenants.command';
import { IamDeleteTenantsService } from './iam-delete-tenants.service';

describe('IamDeleteTenantsCommandHandler', () =>
{
    let commandHandler: IamDeleteTenantsCommandHandler;
    let service: IamDeleteTenantsService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamDeleteTenantsCommandHandler,
                {
                    provide : IamDeleteTenantsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<IamDeleteTenantsCommandHandler>(IamDeleteTenantsCommandHandler);
        service = module.get<IamDeleteTenantsService>(IamDeleteTenantsService);
    });

    describe('main', () =>
    {
        test('IamDeleteTenantsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () =>
        {
            expect(await commandHandler.execute(
                new IamDeleteTenantsCommand(),
            )).toBe(undefined);
        });
    });
});
