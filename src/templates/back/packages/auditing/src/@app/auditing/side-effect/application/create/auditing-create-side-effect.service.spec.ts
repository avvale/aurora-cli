/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { auditingMockSideEffectData } from '@app/auditing/side-effect/infrastructure/mock/auditing-mock-side-effect.data';
import { AuditingCreateSideEffectService } from './auditing-create-side-effect.service';
import {
    AuditingSideEffectId,
    AuditingSideEffectTags,
    AuditingSideEffectModelPath,
    AuditingSideEffectModelName,
    AuditingSideEffectOperationId,
    AuditingSideEffectOperationSort,
    AuditingSideEffectAccountId,
    AuditingSideEffectEmail,
    AuditingSideEffectEvent,
    AuditingSideEffectAuditableId,
    AuditingSideEffectOldValue,
    AuditingSideEffectNewValue,
    AuditingSideEffectIp,
    AuditingSideEffectMethod,
    AuditingSideEffectBaseUrl,
    AuditingSideEffectParams,
    AuditingSideEffectQuery,
    AuditingSideEffectBody,
    AuditingSideEffectUserAgent,
    AuditingSideEffectIsRollback,
    AuditingSideEffectRollbackSideEffectId,
    AuditingSideEffectCreatedAt,
    AuditingSideEffectUpdatedAt,
    AuditingSideEffectDeletedAt,
} from '../../domain/value-objects';
import { AuditingISideEffectRepository } from '../../domain/auditing-side-effect.repository';
import { AuditingMockSideEffectRepository } from '../../infrastructure/mock/auditing-mock-side-effect.repository';

describe('AuditingCreateSideEffectService', () =>

{
    let service: AuditingCreateSideEffectService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                AuditingCreateSideEffectService,
                AuditingMockSideEffectRepository,
                {
                    provide : AuditingISideEffectRepository,
                    useValue: {
                        create: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AuditingCreateSideEffectService);
    });

    describe('main', () =>
    {
        test('AuditingCreateSideEffectService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should create a sideEffect and emit event', async () =>
        {
            expect(
                await service.main(
                    {
                        id: new AuditingSideEffectId(auditingMockSideEffectData[0].id),
                        tags: new AuditingSideEffectTags(auditingMockSideEffectData[0].tags),
                        modelPath: new AuditingSideEffectModelPath(auditingMockSideEffectData[0].modelPath),
                        modelName: new AuditingSideEffectModelName(auditingMockSideEffectData[0].modelName),
                        operationId: new AuditingSideEffectOperationId(auditingMockSideEffectData[0].operationId),
                        operationSort: new AuditingSideEffectOperationSort(auditingMockSideEffectData[0].operationSort),
                        accountId: new AuditingSideEffectAccountId(auditingMockSideEffectData[0].accountId),
                        email: new AuditingSideEffectEmail(auditingMockSideEffectData[0].email),
                        event: new AuditingSideEffectEvent(auditingMockSideEffectData[0].event),
                        auditableId: new AuditingSideEffectAuditableId(auditingMockSideEffectData[0].auditableId),
                        oldValue: new AuditingSideEffectOldValue(auditingMockSideEffectData[0].oldValue),
                        newValue: new AuditingSideEffectNewValue(auditingMockSideEffectData[0].newValue),
                        ip: new AuditingSideEffectIp(auditingMockSideEffectData[0].ip),
                        method: new AuditingSideEffectMethod(auditingMockSideEffectData[0].method),
                        baseUrl: new AuditingSideEffectBaseUrl(auditingMockSideEffectData[0].baseUrl),
                        params: new AuditingSideEffectParams(auditingMockSideEffectData[0].params),
                        query: new AuditingSideEffectQuery(auditingMockSideEffectData[0].query),
                        body: new AuditingSideEffectBody(auditingMockSideEffectData[0].body),
                        userAgent: new AuditingSideEffectUserAgent(auditingMockSideEffectData[0].userAgent),
                        isRollback: new AuditingSideEffectIsRollback(auditingMockSideEffectData[0].isRollback),
                        rollbackSideEffectId: new AuditingSideEffectRollbackSideEffectId(auditingMockSideEffectData[0].rollbackSideEffectId),
                    },
                ),
            )
                .toBe(undefined);
        });
    });
});
