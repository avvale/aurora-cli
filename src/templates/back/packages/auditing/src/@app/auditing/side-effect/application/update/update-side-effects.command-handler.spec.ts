import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { sideEffects } from '@app/auditing/side-effect/infrastructure/mock/mock-side-effect.data';
import { UpdateSideEffectsCommandHandler } from './update-side-effects.command-handler';
import { UpdateSideEffectsCommand } from './update-side-effects.command';
import { UpdateSideEffectsService } from './update-side-effects.service';

describe('UpdateSideEffectsCommandHandler', () =>
{
    let commandHandler: UpdateSideEffectsCommandHandler;
    let service: UpdateSideEffectsService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateSideEffectsCommandHandler,
                {
                    provide : UpdateSideEffectsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<UpdateSideEffectsCommandHandler>(UpdateSideEffectsCommandHandler);
        service = module.get<UpdateSideEffectsService>(UpdateSideEffectsService);
    });

    describe('main', () =>
    {
        test('UpdateSideEffectsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an sideEffects updated', async () =>
        {
            expect(await commandHandler.execute(
                new UpdateSideEffectsCommand(
                    {
                        id: sideEffects[0].id,
                        tags: sideEffects[0].tags,
                        modelPath: sideEffects[0].modelPath,
                        modelName: sideEffects[0].modelName,
                        operationId: sideEffects[0].operationId,
                        operationSort: sideEffects[0].operationSort,
                        accountId: sideEffects[0].accountId,
                        email: sideEffects[0].email,
                        event: sideEffects[0].event,
                        auditableId: sideEffects[0].auditableId,
                        oldValue: sideEffects[0].oldValue,
                        newValue: sideEffects[0].newValue,
                        ip: sideEffects[0].ip,
                        method: sideEffects[0].method,
                        baseUrl: sideEffects[0].baseUrl,
                        params: sideEffects[0].params,
                        query: sideEffects[0].query,
                        body: sideEffects[0].body,
                        userAgent: sideEffects[0].userAgent,
                        isRollback: sideEffects[0].isRollback,
                        rollbackSideEffectId: sideEffects[0].rollbackSideEffectId,
                    },
                    {},
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});