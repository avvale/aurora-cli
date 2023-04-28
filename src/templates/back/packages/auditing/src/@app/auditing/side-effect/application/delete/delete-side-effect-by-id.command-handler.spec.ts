import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteSideEffectByIdCommandHandler } from './delete-side-effect-by-id.command-handler';
import { sideEffects } from '@app/auditing/side-effect/infrastructure/mock/mock-side-effect.data';
import { DeleteSideEffectByIdCommand } from './delete-side-effect-by-id.command';
import { DeleteSideEffectByIdService } from './delete-side-effect-by-id.service';

describe('DeleteSideEffectByIdCommandHandler', () =>
{
    let commandHandler: DeleteSideEffectByIdCommandHandler;
    let service: DeleteSideEffectByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteSideEffectByIdCommandHandler,
                {
                    provide : DeleteSideEffectByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<DeleteSideEffectByIdCommandHandler>(DeleteSideEffectByIdCommandHandler);
        service = module.get<DeleteSideEffectByIdService>(DeleteSideEffectByIdService);
    });

    describe('main', () =>
    {
        test('DeleteSideEffectByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the DeleteSideEffectByIdService', async () =>
        {
            expect(await commandHandler.execute(
                new DeleteSideEffectByIdCommand(
                    sideEffects[0].id,
                ),
            )).toBe(undefined);
        });
    });
});