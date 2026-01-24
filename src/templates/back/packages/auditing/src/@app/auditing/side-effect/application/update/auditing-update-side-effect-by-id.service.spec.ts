/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  AuditingISideEffectRepository,
  auditingMockSideEffectData,
  AuditingMockSideEffectRepository,
} from '@app/auditing/side-effect';
import { AuditingUpdateSideEffectByIdService } from '@app/auditing/side-effect/application/update/auditing-update-side-effect-by-id.service';
import {
  AuditingSideEffectAccountId,
  AuditingSideEffectAuditableId,
  AuditingSideEffectBaseUrl,
  AuditingSideEffectBody,
  AuditingSideEffectEmail,
  AuditingSideEffectEvent,
  AuditingSideEffectId,
  AuditingSideEffectIp,
  AuditingSideEffectIsRollback,
  AuditingSideEffectMethod,
  AuditingSideEffectModelName,
  AuditingSideEffectModelPath,
  AuditingSideEffectNewValue,
  AuditingSideEffectOldValue,
  AuditingSideEffectOperationId,
  AuditingSideEffectOperationSort,
  AuditingSideEffectParams,
  AuditingSideEffectQuery,
  AuditingSideEffectRollbackSideEffectId,
  AuditingSideEffectRowId,
  AuditingSideEffectTags,
  AuditingSideEffectUserAgent,
} from '@app/auditing/side-effect/domain/value-objects';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuditingUpdateSideEffectByIdService', () => {
  let service: AuditingUpdateSideEffectByIdService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        AuditingUpdateSideEffectByIdService,
        AuditingMockSideEffectRepository,
        {
          provide: AuditingISideEffectRepository,
          useValue: {
            updateById: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(AuditingUpdateSideEffectByIdService);
  });

  describe('main', () => {
    test('AuditingUpdateSideEffectByIdService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should update a sideEffect and emit event', async () => {
      expect(
        await service.main(
          {
            id: new AuditingSideEffectId(auditingMockSideEffectData[0].id),
            rowId: new AuditingSideEffectRowId(
              auditingMockSideEffectData[0].rowId,
            ),
            tags: new AuditingSideEffectTags(
              auditingMockSideEffectData[0].tags,
            ),
            modelPath: new AuditingSideEffectModelPath(
              auditingMockSideEffectData[0].modelPath,
            ),
            modelName: new AuditingSideEffectModelName(
              auditingMockSideEffectData[0].modelName,
            ),
            operationId: new AuditingSideEffectOperationId(
              auditingMockSideEffectData[0].operationId,
            ),
            operationSort: new AuditingSideEffectOperationSort(
              auditingMockSideEffectData[0].operationSort,
            ),
            accountId: new AuditingSideEffectAccountId(
              auditingMockSideEffectData[0].accountId,
            ),
            email: new AuditingSideEffectEmail(
              auditingMockSideEffectData[0].email,
            ),
            event: new AuditingSideEffectEvent(
              auditingMockSideEffectData[0].event,
            ),
            auditableId: new AuditingSideEffectAuditableId(
              auditingMockSideEffectData[0].auditableId,
            ),
            oldValue: new AuditingSideEffectOldValue(
              auditingMockSideEffectData[0].oldValue,
            ),
            newValue: new AuditingSideEffectNewValue(
              auditingMockSideEffectData[0].newValue,
            ),
            ip: new AuditingSideEffectIp(auditingMockSideEffectData[0].ip),
            method: new AuditingSideEffectMethod(
              auditingMockSideEffectData[0].method,
            ),
            baseUrl: new AuditingSideEffectBaseUrl(
              auditingMockSideEffectData[0].baseUrl,
            ),
            params: new AuditingSideEffectParams(
              auditingMockSideEffectData[0].params,
            ),
            query: new AuditingSideEffectQuery(
              auditingMockSideEffectData[0].query,
            ),
            body: new AuditingSideEffectBody(
              auditingMockSideEffectData[0].body,
            ),
            userAgent: new AuditingSideEffectUserAgent(
              auditingMockSideEffectData[0].userAgent,
            ),
            isRollback: new AuditingSideEffectIsRollback(
              auditingMockSideEffectData[0].isRollback,
            ),
            rollbackSideEffectId: new AuditingSideEffectRollbackSideEffectId(
              auditingMockSideEffectData[0].rollbackSideEffectId,
            ),
          },
          {},
        ),
      ).toBe(undefined);
    });
  });
});
