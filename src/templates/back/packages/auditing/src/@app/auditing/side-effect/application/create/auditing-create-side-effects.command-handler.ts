/* eslint-disable key-spacing */
import { AuditingCreateSideEffectsCommand } from '@app/auditing/side-effect';
import { AuditingCreateSideEffectsService } from '@app/auditing/side-effect/application/create/auditing-create-side-effects.service';
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
    AuditingSideEffectTags,
    AuditingSideEffectUserAgent,
} from '@app/auditing/side-effect/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(AuditingCreateSideEffectsCommand)
export class AuditingCreateSideEffectsCommandHandler
    implements ICommandHandler<AuditingCreateSideEffectsCommand>
{
    constructor(
        private readonly createSideEffectsService: AuditingCreateSideEffectsService,
    ) {}

    async execute(command: AuditingCreateSideEffectsCommand): Promise<void> {
        // call to use case and implements ValueObjects
        await this.createSideEffectsService.main(
            command.payload.map((sideEffect) => {
                return {
                    id: new AuditingSideEffectId(sideEffect.id),
                    tags: new AuditingSideEffectTags(sideEffect.tags),
                    modelPath: new AuditingSideEffectModelPath(
                        sideEffect.modelPath,
                    ),
                    modelName: new AuditingSideEffectModelName(
                        sideEffect.modelName,
                    ),
                    operationId: new AuditingSideEffectOperationId(
                        sideEffect.operationId,
                    ),
                    operationSort: new AuditingSideEffectOperationSort(
                        sideEffect.operationSort,
                    ),
                    accountId: new AuditingSideEffectAccountId(
                        sideEffect.accountId,
                    ),
                    email: new AuditingSideEffectEmail(sideEffect.email),
                    event: new AuditingSideEffectEvent(sideEffect.event),
                    auditableId: new AuditingSideEffectAuditableId(
                        sideEffect.auditableId,
                    ),
                    oldValue: new AuditingSideEffectOldValue(
                        sideEffect.oldValue,
                    ),
                    newValue: new AuditingSideEffectNewValue(
                        sideEffect.newValue,
                    ),
                    ip: new AuditingSideEffectIp(sideEffect.ip),
                    method: new AuditingSideEffectMethod(sideEffect.method),
                    baseUrl: new AuditingSideEffectBaseUrl(sideEffect.baseUrl),
                    params: new AuditingSideEffectParams(sideEffect.params),
                    query: new AuditingSideEffectQuery(sideEffect.query),
                    body: new AuditingSideEffectBody(sideEffect.body),
                    userAgent: new AuditingSideEffectUserAgent(
                        sideEffect.userAgent,
                    ),
                    isRollback: new AuditingSideEffectIsRollback(
                        sideEffect.isRollback,
                    ),
                    rollbackSideEffectId:
                        new AuditingSideEffectRollbackSideEffectId(
                            sideEffect.rollbackSideEffectId,
                        ),
                };
            }),
            command.cQMetadata,
        );
    }
}
