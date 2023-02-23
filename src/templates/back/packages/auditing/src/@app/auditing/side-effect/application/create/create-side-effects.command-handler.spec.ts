/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { sideEffects } from '@app/auditing/side-effect/infrastructure/mock/mock-side-effect.data';
import { CreateSideEffectsCommandHandler } from './create-side-effects.command-handler';
import { CreateSideEffectsCommand } from './create-side-effects.command';
import { CreateSideEffectsService } from './create-side-effects.service';

describe('CreateSideEffectsCommandHandler', () =>
{
    let commandHandler: CreateSideEffectsCommandHandler;
    let service: CreateSideEffectsService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateSideEffectsCommandHandler,
                {
                    provide : CreateSideEffectsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler  = module.get<CreateSideEffectsCommandHandler>(CreateSideEffectsCommandHandler);
        service         = module.get<CreateSideEffectsService>(CreateSideEffectsService);
    });

    describe('main', () =>
    {
        test('CreateSideEffectsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return sideEffects createds', async () =>
        {
            expect(await commandHandler.execute(
                new CreateSideEffectsCommand(
                    sideEffects,
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});