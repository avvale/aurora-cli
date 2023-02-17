import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteSideEffectsCommand } from './delete-side-effects.command';
import { DeleteSideEffectsService } from './delete-side-effects.service';

@CommandHandler(DeleteSideEffectsCommand)
export class DeleteSideEffectsCommandHandler implements ICommandHandler<DeleteSideEffectsCommand>
{
    constructor(
        private readonly deleteSideEffectsService: DeleteSideEffectsService,
    ) {}

    async execute(command: DeleteSideEffectsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteSideEffectsService.main(
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}