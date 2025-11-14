import { AuditingDeleteSideEffectByIdCommand } from '@app/auditing/side-effect';
import { AuditingDeleteSideEffectByIdService } from '@app/auditing/side-effect/application/delete/auditing-delete-side-effect-by-id.service';
import { AuditingSideEffectId } from '@app/auditing/side-effect/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(AuditingDeleteSideEffectByIdCommand)
export class AuditingDeleteSideEffectByIdCommandHandler
    implements ICommandHandler<AuditingDeleteSideEffectByIdCommand>
{
    constructor(
        private readonly deleteSideEffectByIdService: AuditingDeleteSideEffectByIdService,
    ) {}

    async execute(command: AuditingDeleteSideEffectByIdCommand): Promise<void> {
        // call to use case and implements ValueObjects
        await this.deleteSideEffectByIdService.main(
            new AuditingSideEffectId(command.id),
            command.constraint,
            command.cQMetadata,
        );
    }
}
