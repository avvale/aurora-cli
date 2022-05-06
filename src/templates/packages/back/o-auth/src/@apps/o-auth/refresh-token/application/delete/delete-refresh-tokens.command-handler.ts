import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteRefreshTokensCommand } from './delete-refresh-tokens.command';
import { DeleteRefreshTokensService } from './delete-refresh-tokens.service';

@CommandHandler(DeleteRefreshTokensCommand)
export class DeleteRefreshTokensCommandHandler implements ICommandHandler<DeleteRefreshTokensCommand>
{
    constructor(
        private readonly deleteRefreshTokensService: DeleteRefreshTokensService,
    ) {}

    async execute(command: DeleteRefreshTokensCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteRefreshTokensService.main(
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}