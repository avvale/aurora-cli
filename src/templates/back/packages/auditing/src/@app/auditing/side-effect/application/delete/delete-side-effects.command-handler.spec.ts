import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteSideEffectsCommandHandler } from './delete-side-effects.command-handler';
import { DeleteSideEffectsCommand } from './delete-side-effects.command';
import { DeleteSideEffectsService } from './delete-side-effects.service';

describe('DeleteSideEffectsCommandHandler', () =>
{
    let commandHandler: DeleteSideEffectsCommandHandler;
    let service: DeleteSideEffectsService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteSideEffectsCommandHandler,
                {
                    provide : DeleteSideEffectsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<DeleteSideEffectsCommandHandler>(DeleteSideEffectsCommandHandler);
        service = module.get<DeleteSideEffectsService>(DeleteSideEffectsService);
    });

    describe('main', () =>
    {
        test('DeleteSideEffectsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () =>
        {
            expect(await commandHandler.execute(
                new DeleteSideEffectsCommand(),
            )).toBe(undefined);
        });
    });
});