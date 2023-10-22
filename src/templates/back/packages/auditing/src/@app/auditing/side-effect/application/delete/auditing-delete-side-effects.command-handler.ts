import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AuditingDeleteSideEffectsCommand } from './auditing-delete-side-effects.command';
import { AuditingDeleteSideEffectsService } from './auditing-delete-side-effects.service';

@CommandHandler(AuditingDeleteSideEffectsCommand)
export class AuditingDeleteSideEffectsCommandHandler implements ICommandHandler<AuditingDeleteSideEffectsCommand>
{
    constructor(
        private readonly deleteSideEffectsService: AuditingDeleteSideEffectsService,
    ) {}

    async execute(command: AuditingDeleteSideEffectsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteSideEffectsService.main(
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
