import { auditingMockSideEffectData, AuditingUpdateSideEffectsCommand } from '@app/auditing/side-effect';
import { AuditingUpdateSideEffectsCommandHandler } from '@app/auditing/side-effect/application/update/auditing-update-side-effects.command-handler';
import { AuditingUpdateSideEffectsService } from '@app/auditing/side-effect/application/update/auditing-update-side-effects.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuditingUpdateSideEffectsCommandHandler', () =>
{
    let commandHandler: AuditingUpdateSideEffectsCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuditingUpdateSideEffectsCommandHandler,
                {
                    provide : AuditingUpdateSideEffectsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AuditingUpdateSideEffectsCommandHandler>(AuditingUpdateSideEffectsCommandHandler);
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
                new AuditingUpdateSideEffectsCommand(
                    {
                        id: auditingMockSideEffectData[0].id,
                        tags: auditingMockSideEffectData[0].tags,
                        modelPath: auditingMockSideEffectData[0].modelPath,
                        modelName: auditingMockSideEffectData[0].modelName,
                        operationId: auditingMockSideEffectData[0].operationId,
                        operationSort: auditingMockSideEffectData[0].operationSort,
                        accountId: auditingMockSideEffectData[0].accountId,
                        email: auditingMockSideEffectData[0].email,
                        event: auditingMockSideEffectData[0].event,
                        auditableId: auditingMockSideEffectData[0].auditableId,
                        oldValue: auditingMockSideEffectData[0].oldValue,
                        newValue: auditingMockSideEffectData[0].newValue,
                        ip: auditingMockSideEffectData[0].ip,
                        method: auditingMockSideEffectData[0].method,
                        baseUrl: auditingMockSideEffectData[0].baseUrl,
                        params: auditingMockSideEffectData[0].params,
                        query: auditingMockSideEffectData[0].query,
                        body: auditingMockSideEffectData[0].body,
                        userAgent: auditingMockSideEffectData[0].userAgent,
                        isRollback: auditingMockSideEffectData[0].isRollback,
                        rollbackSideEffectId: auditingMockSideEffectData[0].rollbackSideEffectId,
                    },
                    {},
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
