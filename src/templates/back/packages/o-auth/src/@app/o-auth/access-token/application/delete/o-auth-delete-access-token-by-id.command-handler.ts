import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { OAuthDeleteAccessTokenByIdCommand } from './o-auth-delete-access-token-by-id.command';
import { OAuthDeleteAccessTokenByIdService } from './o-auth-delete-access-token-by-id.service';
import {
    OAuthAccessTokenId
} from '../../domain/value-objects';

@CommandHandler(OAuthDeleteAccessTokenByIdCommand)
export class OAuthDeleteAccessTokenByIdCommandHandler implements ICommandHandler<OAuthDeleteAccessTokenByIdCommand>
{
    constructor(
        private readonly deleteAccessTokenByIdService: OAuthDeleteAccessTokenByIdService,
    ) {}

    async execute(command: OAuthDeleteAccessTokenByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteAccessTokenByIdService.main(
            new OAuthAccessTokenId(command.id),
            command.constraint,
            command.cQMetadata,
        );
    }
}
