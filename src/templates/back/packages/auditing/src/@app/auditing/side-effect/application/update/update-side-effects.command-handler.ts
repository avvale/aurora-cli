/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateSideEffectsCommand } from './update-side-effects.command';
import { UpdateSideEffectsService } from './update-side-effects.service';
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

@CommandHandler(UpdateSideEffectsCommand)
export class UpdateSideEffectsCommandHandler implements ICommandHandler<UpdateSideEffectsCommand>
{
    constructor(
        private readonly updateSideEffectsService: UpdateSideEffectsService,
    ) {}

    async execute(command: UpdateSideEffectsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateSideEffectsService.main(
            {
                id: new SideEffectId(command.payload.id, { undefinable: true }),
                tags: new SideEffectTags(command.payload.tags),
                modelPath: new SideEffectModelPath(command.payload.modelPath, { undefinable: true }),
                modelName: new SideEffectModelName(command.payload.modelName, { undefinable: true }),
                operationId: new SideEffectOperationId(command.payload.operationId),
                operationSort: new SideEffectOperationSort(command.payload.operationSort),
                accountId: new SideEffectAccountId(command.payload.accountId, { undefinable: true }),
                email: new SideEffectEmail(command.payload.email, { undefinable: true }),
                event: new SideEffectEvent(command.payload.event, { undefinable: true }),
                auditableId: new SideEffectAuditableId(command.payload.auditableId),
                oldValue: new SideEffectOldValue(command.payload.oldValue),
                newValue: new SideEffectNewValue(command.payload.newValue),
                ip: new SideEffectIp(command.payload.ip),
                method: new SideEffectMethod(command.payload.method, { undefinable: true }),
                baseUrl: new SideEffectBaseUrl(command.payload.baseUrl),
                params: new SideEffectParams(command.payload.params),
                query: new SideEffectQuery(command.payload.query),
                body: new SideEffectBody(command.payload.body),
                userAgent: new SideEffectUserAgent(command.payload.userAgent),
                isRollback: new SideEffectIsRollback(command.payload.isRollback, { undefinable: true }),
                rollbackSideEffectId: new SideEffectRollbackSideEffectId(command.payload.rollbackSideEffectId),
            },
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}