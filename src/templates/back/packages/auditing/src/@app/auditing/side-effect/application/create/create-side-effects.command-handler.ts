/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateSideEffectsCommand } from './create-side-effects.command';
import { CreateSideEffectsService } from './create-side-effects.service';
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

@CommandHandler(CreateSideEffectsCommand)
export class CreateSideEffectsCommandHandler implements ICommandHandler<CreateSideEffectsCommand>
{
    constructor(
        private readonly createSideEffectsService: CreateSideEffectsService,
    ) {}

    async execute(command: CreateSideEffectsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createSideEffectsService.main(
            command.payload
                .map(sideEffect =>
                {
                    return {
                        id: new SideEffectId(sideEffect.id),
                        modelPath: new SideEffectModelPath(sideEffect.modelPath),
                        modelName: new SideEffectModelName(sideEffect.modelName),
                        operationId: new SideEffectOperationId(sideEffect.operationId),
                        operationSort: new SideEffectOperationSort(sideEffect.operationSort),
                        accountId: new SideEffectAccountId(sideEffect.accountId),
                        email: new SideEffectEmail(sideEffect.email),
                        event: new SideEffectEvent(sideEffect.event),
                        auditableId: new SideEffectAuditableId(sideEffect.auditableId),
                        oldValue: new SideEffectOldValue(sideEffect.oldValue),
                        newValue: new SideEffectNewValue(sideEffect.newValue),
                        ip: new SideEffectIp(sideEffect.ip),
                        method: new SideEffectMethod(sideEffect.method),
                        baseUrl: new SideEffectBaseUrl(sideEffect.baseUrl),
                        params: new SideEffectParams(sideEffect.params),
                        query: new SideEffectQuery(sideEffect.query),
                        body: new SideEffectBody(sideEffect.body),
                        userAgent: new SideEffectUserAgent(sideEffect.userAgent),
                        tags: new SideEffectTags(sideEffect.tags),
                        isRollback: new SideEffectIsRollback(sideEffect.isRollback),
                        rollbackSideEffectId: new SideEffectRollbackSideEffectId(sideEffect.rollbackSideEffectId),
                    };
                }),
            command.cQMetadata,
        );
    }
}