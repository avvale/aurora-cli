import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteAccessTokensCommand } from './delete-access-tokens.command';
import { DeleteAccessTokensService } from './delete-access-tokens.service';

@CommandHandler(DeleteAccessTokensCommand)
export class DeleteAccessTokensCommandHandler implements ICommandHandler<DeleteAccessTokensCommand>
{
    constructor(
        private readonly deleteAccessTokensService: DeleteAccessTokensService,
    ) {}

    async execute(command: DeleteAccessTokensCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteAccessTokensService.main(
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}