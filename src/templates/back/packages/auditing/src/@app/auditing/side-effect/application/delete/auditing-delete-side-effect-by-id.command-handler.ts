import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AuditingDeleteSideEffectByIdCommand } from './auditing-delete-side-effect-by-id.command';
import { AuditingDeleteSideEffectByIdService } from './auditing-delete-side-effect-by-id.service';
import {
    AuditingSideEffectId
} from '../../domain/value-objects';

@CommandHandler(AuditingDeleteSideEffectByIdCommand)
export class AuditingDeleteSideEffectByIdCommandHandler implements ICommandHandler<AuditingDeleteSideEffectByIdCommand>
{
    constructor(
        private readonly deleteSideEffectByIdService: AuditingDeleteSideEffectByIdService,
    ) {}

    async execute(command: AuditingDeleteSideEffectByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteSideEffectByIdService.main(
            new AuditingSideEffectId(command.id),
            command.constraint,
            command.cQMetadata,
        );
    }
}
