/* eslint-disable key-spacing */
import { AuditingUpdateSideEffectByIdCommand } from '@app/auditing/side-effect';
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
    AuditingSideEffectTags,
    AuditingSideEffectUserAgent,
} from '@app/auditing/side-effect/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(AuditingUpdateSideEffectByIdCommand)
export class AuditingUpdateSideEffectByIdCommandHandler implements ICommandHandler<AuditingUpdateSideEffectByIdCommand>
{
    constructor(
        private readonly updateSideEffectByIdService: AuditingUpdateSideEffectByIdService,
    ) {}

    async execute(command: AuditingUpdateSideEffectByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateSideEffectByIdService.main(
            {
                id: new AuditingSideEffectId(command.payload.id),
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
                method: new AuditingSideEffectMethod(command.payload.method),
                baseUrl: new AuditingSideEffectBaseUrl(command.payload.baseUrl),
                params: new AuditingSideEffectParams(command.payload.params),
                query: new AuditingSideEffectQuery(command.payload.query),
                body: new AuditingSideEffectBody(command.payload.body),
                userAgent: new AuditingSideEffectUserAgent(command.payload.userAgent),
                isRollback: new AuditingSideEffectIsRollback(command.payload.isRollback, { undefinable: true }),
                rollbackSideEffectId: new AuditingSideEffectRollbackSideEffectId(command.payload.rollbackSideEffectId),
            },
            command.constraint,
            command.cQMetadata,
        );
    }
}
