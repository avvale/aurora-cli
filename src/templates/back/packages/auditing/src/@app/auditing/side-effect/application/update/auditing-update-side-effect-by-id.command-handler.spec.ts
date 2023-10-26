import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { auditingMockSideEffectData } from '@app/auditing/side-effect/infrastructure/mock/auditing-mock-side-effect.data';
import { AuditingUpdateSideEffectByIdCommandHandler } from './auditing-update-side-effect-by-id.command-handler';
import { AuditingUpdateSideEffectByIdCommand } from './auditing-update-side-effect-by-id.command';
import { AuditingUpdateSideEffectByIdService } from './auditing-update-side-effect-by-id.service';

describe('AuditingUpdateSideEffectByIdCommandHandler', () =>
{
    let commandHandler: AuditingUpdateSideEffectByIdCommandHandler;
    let service: AuditingUpdateSideEffectByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuditingUpdateSideEffectByIdCommandHandler,
                {
                    provide : AuditingUpdateSideEffectByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AuditingUpdateSideEffectByIdCommandHandler>(AuditingUpdateSideEffectByIdCommandHandler);
        service = module.get<AuditingUpdateSideEffectByIdService>(AuditingUpdateSideEffectByIdService);
    });

    describe('main', () =>
    {
        test('UpdateSideEffectByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an sideEffect created', async () =>
        {
            expect(await commandHandler.execute(
                new AuditingUpdateSideEffectByIdCommand(
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
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});