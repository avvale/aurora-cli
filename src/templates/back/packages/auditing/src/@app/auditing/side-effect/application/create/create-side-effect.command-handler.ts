/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateSideEffectCommand } from './create-side-effect.command';
import { CreateSideEffectService } from './create-side-effect.service';
import {
    SideEffectId,
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
    SideEffectTags,
    SideEffectIsRollback,
    SideEffectRollbackSideEffectId,
    SideEffectCreatedAt,
    SideEffectUpdatedAt,
    SideEffectDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(CreateSideEffectCommand)
export class CreateSideEffectCommandHandler implements ICommandHandler<CreateSideEffectCommand>
{
    constructor(
        private readonly createSideEffectService: CreateSideEffectService,
    ) {}

    async execute(command: CreateSideEffectCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createSideEffectService.main(
            {
                id: new SideEffectId(command.payload.id),
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
                tags: new SideEffectTags(command.payload.tags),
                isRollback: new SideEffectIsRollback(command.payload.isRollback),
                rollbackSideEffectId: new SideEffectRollbackSideEffectId(command.payload.rollbackSideEffectId),
            },
            command.cQMetadata,
        );
    }
}