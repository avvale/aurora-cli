import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteScopesCommand } from './delete-scopes.command';
import { DeleteScopesService } from './delete-scopes.service';

@CommandHandler(DeleteScopesCommand)
export class DeleteScopesCommandHandler implements ICommandHandler<DeleteScopesCommand>
{
    constructor(
        private readonly deleteScopesService: DeleteScopesService,
    ) {}

    async execute(command: DeleteScopesCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteScopesService.main(
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}