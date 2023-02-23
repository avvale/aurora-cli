/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpsertSideEffectCommand } from './upsert-side-effect.command';
import { UpsertSideEffectService } from './upsert-side-effect.service';
import {
    SideEffectId,
    SideEffectTags,
    SideEffectModelPath,
    SideEffectModelName,
    SideEffectOperationId,
    SideEffectOperationSort,
    SideEffectAccountId,
    SideEffectEmail,
    SideEffectEvent,
    SideEffectAuditableId,
    SideEffectOldValue,
    SideEffectNewValue,
    SideEffectIp,
    SideEffectMethod,
    SideEffectBaseUrl,
    SideEffectParams,
    SideEffectQuery,
    SideEffectBody,
    SideEffectUserAgent,
    SideEffectIsRollback,
    SideEffectRollbackSideEffectId,
    SideEffectCreatedAt,
    SideEffectUpdatedAt,
    SideEffectDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(UpsertSideEffectCommand)
export class UpsertSideEffectCommandHandler implements ICommandHandler<UpsertSideEffectCommand>
{
    constructor(
        private readonly upsertSideEffectService: UpsertSideEffectService,
    ) {}

    async execute(command: UpsertSideEffectCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.upsertSideEffectService.main(
            {
                id: new SideEffectId(command.payload.id),
                tags: new SideEffectTags(command.payload.tags),
                modelPath: new SideEffectModelPath(command.payload.modelPath),
                modelName: new SideEffectModelName(command.payload.modelName),
                operationId: new SideEffectOperationId(command.payload.operationId),
                operationSort: new SideEffectOperationSort(command.payload.operationSort),
                accountId: new SideEffectAccountId(command.payload.accountId),
                email: new SideEffectEmail(command.payload.email),
                event: new SideEffectEvent(command.payload.event),
                auditableId: new SideEffectAuditableId(command.payload.auditableId),
                oldValue: new SideEffectOldValue(command.payload.oldValue),
                newValue: new SideEffectNewValue(command.payload.newValue),
                ip: new SideEffectIp(command.payload.ip),
                method: new SideEffectMethod(command.payload.method),
                baseUrl: new SideEffectBaseUrl(command.payload.baseUrl),
                params: new SideEffectParams(command.payload.params),
                query: new SideEffectQuery(command.payload.query),
                body: new SideEffectBody(command.payload.body),
                userAgent: new SideEffectUserAgent(command.payload.userAgent),
                isRollback: new SideEffectIsRollback(command.payload.isRollback),
                rollbackSideEffectId: new SideEffectRollbackSideEffectId(command.payload.rollbackSideEffectId),
            },
            command.cQMetadata,
        );
    }
}