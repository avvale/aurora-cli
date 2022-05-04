import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteScopesCommandHandler } from './delete-scopes.command-handler';
import { DeleteScopesCommand } from './delete-scopes.command';
import { DeleteScopesService } from './delete-scopes.service';

describe('DeleteScopesCommandHandler', () =>
{
    let commandHandler: DeleteScopesCommandHandler;
    let service: DeleteScopesService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteScopesCommandHandler,
                {
                    provide : DeleteScopesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        commandHandler  = module.get<DeleteScopesCommandHandler>(DeleteScopesCommandHandler);
        service         = module.get<DeleteScopesService>(DeleteScopesService);
    });

    describe('main', () =>
    {
        test('DeleteScopesCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () =>
        {
            expect(await commandHandler.execute(
                new DeleteScopesCommand(),
            )).toBe(undefined);
        });
    });
});