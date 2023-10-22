/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AuditingCreateSideEffectCommand } from './auditing-create-side-effect.command';
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

@CommandHandler(AuditingCreateSideEffectCommand)
export class AuditingCreateSideEffectCommandHandler implements ICommandHandler<AuditingCreateSideEffectCommand>
{
    constructor(
        private readonly createSideEffectService: AuditingCreateSideEffectService,
    ) {}

    async execute(command: AuditingCreateSideEffectCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createSideEffectService.main(
            {
                id: new AuditingSideEffectId(command.payload.id),
                tags: new AuditingSideEffectTags(command.payload.tags),
                modelPath: new AuditingSideEffectModelPath(command.payload.modelPath),
                modelName: new AuditingSideEffectModelName(command.payload.modelName),
                operationId: new AuditingSideEffectOperationId(command.payload.operationId),
                operationSort: new AuditingSideEffectOperationSort(command.payload.operationSort),
                accountId: new AuditingSideEffectAccountId(command.payload.accountId),
                email: new AuditingSideEffectEmail(command.payload.email),
                event: new AuditingSideEffectEvent(command.payload.event),
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
                isRollback: new AuditingSideEffectIsRollback(command.payload.isRollback),
                rollbackSideEffectId: new AuditingSideEffectRollbackSideEffectId(command.payload.rollbackSideEffectId),
            },
            command.cQMetadata,
        );
    }
}
