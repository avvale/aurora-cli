import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteAccessTokenByIdCommand } from './delete-access-token-by-id.command';
import { DeleteAccessTokenByIdService } from './delete-access-token-by-id.service';
import {
    AccessTokenId
} from '../../domain/value-objects';

@CommandHandler(DeleteAccessTokenByIdCommand)
export class DeleteAccessTokenByIdCommandHandler implements ICommandHandler<DeleteAccessTokenByIdCommand>
{
    constructor(
        private readonly deleteAccessTokenByIdService: DeleteAccessTokenByIdService,
    ) {}

    async execute(command: DeleteAccessTokenByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteAccessTokenByIdService.main(
            new AccessTokenId(command.id),
            command.constraint,
            command.cQMetadata,
        );
    }
}