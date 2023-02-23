import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteRefreshTokenByIdCommand } from './delete-refresh-token-by-id.command';
import { DeleteRefreshTokenByIdService } from './delete-refresh-token-by-id.service';
import {
    RefreshTokenId
} from '../../domain/value-objects';

@CommandHandler(DeleteRefreshTokenByIdCommand)
export class DeleteRefreshTokenByIdCommandHandler implements ICommandHandler<DeleteRefreshTokenByIdCommand>
{
    constructor(
        private readonly deleteRefreshTokenByIdService: DeleteRefreshTokenByIdService,
    ) {}

    async execute(command: DeleteRefreshTokenByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteRefreshTokenByIdService.main(
            new RefreshTokenId(command.id),
            command.constraint,
            command.cQMetadata,
        );
    }
}