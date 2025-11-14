/* eslint-disable key-spacing */
import { AuditingCreateSideEffectCommand } from '@app/auditing/side-effect';
import { AuditingCreateSideEffectService } from '@app/auditing/side-effect/application/create/auditing-create-side-effect.service';
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

@CommandHandler(AuditingCreateSideEffectCommand)
export class AuditingCreateSideEffectCommandHandler
    implements ICommandHandler<AuditingCreateSideEffectCommand>
{
    constructor(
        private readonly createSideEffectService: AuditingCreateSideEffectService,
    ) {}

    async execute(command: AuditingCreateSideEffectCommand): Promise<void> {
        // call to use case and implements ValueObjects
        await this.createSideEffectService.main(
            {
                id: new AuditingSideEffectId(command.payload.id),
                tags: new AuditingSideEffectTags(command.payload.tags),
                modelPath: new AuditingSideEffectModelPath(
                    command.payload.modelPath,
                ),
                modelName: new AuditingSideEffectModelName(
                    command.payload.modelName,
                ),
                operationId: new AuditingSideEffectOperationId(
                    command.payload.operationId,
                ),
                operationSort: new AuditingSideEffectOperationSort(
                    command.payload.operationSort,
                ),
                accountId: new AuditingSideEffectAccountId(
                    command.payload.accountId,
                ),
                email: new AuditingSideEffectEmail(command.payload.email),
                event: new AuditingSideEffectEvent(command.payload.event),
                auditableId: new AuditingSideEffectAuditableId(
                    command.payload.auditableId,
                ),
                oldValue: new AuditingSideEffectOldValue(
                    command.payload.oldValue,
                ),
                newValue: new AuditingSideEffectNewValue(
                    command.payload.newValue,
                ),
                ip: new AuditingSideEffectIp(command.payload.ip),
                method: new AuditingSideEffectMethod(command.payload.method),
                baseUrl: new AuditingSideEffectBaseUrl(command.payload.baseUrl),
                params: new AuditingSideEffectParams(command.payload.params),
                query: new AuditingSideEffectQuery(command.payload.query),
                body: new AuditingSideEffectBody(command.payload.body),
                userAgent: new AuditingSideEffectUserAgent(
                    command.payload.userAgent,
                ),
                isRollback: new AuditingSideEffectIsRollback(
                    command.payload.isRollback,
                ),
                rollbackSideEffectId:
                    new AuditingSideEffectRollbackSideEffectId(
                        command.payload.rollbackSideEffectId,
                    ),
            },
            command.cQMetadata,
        );
    }
}
