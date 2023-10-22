/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AuditingUpdateSideEffectsCommand } from './auditing-update-side-effects.command';
import { AuditingUpdateSideEffectsService } from './auditing-update-side-effects.service';
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

@CommandHandler(AuditingUpdateSideEffectsCommand)
export class AuditingUpdateSideEffectsCommandHandler implements ICommandHandler<AuditingUpdateSideEffectsCommand>
{
    constructor(
        private readonly updateSideEffectsService: AuditingUpdateSideEffectsService,
    ) {}

    async execute(command: AuditingUpdateSideEffectsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateSideEffectsService.main(
            {
                id: new AuditingSideEffectId(command.payload.id, { undefinable: true }),
                tags: new AuditingSideEffectTags(command.payload.tags),
                modelPath: new AuditingSideEffectModelPath(command.payload.modelPath, { undefinable: true }),
                modelName: new AuditingSideEffectModelName(command.payload.modelName, { undefinable: true }),
                operationId: new AuditingSideEffectOperationId(command.payload.operationId),
                operationSort: new AuditingSideEffectOperationSort(command.payload.operationSort),
                accountId: new AuditingSideEffectAccountId(command.payload.accountId, { undefinable: true }),
                email: new AuditingSideEffectEmail(command.payload.email, { undefinable: true }),
                event: new AuditingSideEffectEvent(command.payload.event, { undefinable: true }),
                auditableId: new AuditingSideEffectAuditableId(command.payload.auditableId),
                oldValue: new AuditingSideEffectOldValue(command.payload.oldValue),
                newValue: new AuditingSideEffectNewValue(command.payload.newValue),
                ip: new AuditingSideEffectIp(command.payload.ip),
                method: new AuditingSideEffectMethod(command.payload.method, { undefinable: true }),
                baseUrl: new AuditingSideEffectBaseUrl(command.payload.baseUrl),
                params: new AuditingSideEffectParams(command.payload.params),
                query: new AuditingSideEffectQuery(command.payload.query),
                body: new AuditingSideEffectBody(command.payload.body),
                userAgent: new AuditingSideEffectUserAgent(command.payload.userAgent),
                isRollback: new AuditingSideEffectIsRollback(command.payload.isRollback, { undefinable: true }),
                rollbackSideEffectId: new AuditingSideEffectRollbackSideEffectId(command.payload.rollbackSideEffectId),
            },
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
