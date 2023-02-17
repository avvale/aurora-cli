import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { sideEffects } from '@app/auditing/side-effect/infrastructure/seeds/side-effect.seed';
import { UpsertSideEffectCommandHandler } from './upsert-side-effect.command-handler';
import { UpsertSideEffectCommand } from './upsert-side-effect.command';
import { UpsertSideEffectService } from './upsert-side-effect.service';

describe('UpsertSideEffectCommandHandler', () =>
{
    let commandHandler: UpsertSideEffectCommandHandler;
    let service: UpsertSideEffectService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpsertSideEffectCommandHandler,
                {
                    provide : UpsertSideEffectService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler  = module.get<UpsertSideEffectCommandHandler>(UpsertSideEffectCommandHandler);
        service         = module.get<UpsertSideEffectService>(UpsertSideEffectService);
    });

    describe('main', () =>
    {
        test('UpsertSideEffectCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should upsert the values objects and pass them as parameters to the UpsertSideEffectService', async () =>
        {
            expect(await commandHandler.execute(
                new UpsertSideEffectCommand(
                    {
                        id: sideEffects[0].id,
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
                        tags: sideEffects[0].tags,
                        isRollback: sideEffects[0].isRollback,
                        rollbackSideEffectId: sideEffects[0].rollbackSideEffectId,
                    },
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});