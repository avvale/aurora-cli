import { AuditingCreateSideEffectCommandHandler } from './auditing-create-side-effect.command-handler';
import { AuditingCreateSideEffectService } from './auditing-create-side-effect.service';
import { AuditingCreateSideEffectCommand, auditingMockSideEffectData } from '@app/auditing/side-effect';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuditingCreateSideEffectCommandHandler', () =>
{
    let commandHandler: AuditingCreateSideEffectCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuditingCreateSideEffectCommandHandler,
                {
                    provide : AuditingCreateSideEffectService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AuditingCreateSideEffectCommandHandler>(AuditingCreateSideEffectCommandHandler);
    });

    describe('main', () =>
    {
        test('CreateSideEffectCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the values objects and pass them as parameters to the AuditingCreateSideEffectService', async () =>
        {
            expect(await commandHandler.execute(
                new AuditingCreateSideEffectCommand(
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
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
