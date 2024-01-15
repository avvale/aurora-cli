import { AuditingDeleteSideEffectsCommand } from '@app/auditing/side-effect';
import { AuditingDeleteSideEffectsService } from '@app/auditing/side-effect/application/delete/auditing-delete-side-effects.service';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

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
