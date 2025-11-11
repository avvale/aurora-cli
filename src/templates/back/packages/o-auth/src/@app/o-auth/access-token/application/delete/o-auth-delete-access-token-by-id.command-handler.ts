import { OAuthDeleteAccessTokenByIdCommand } from '@app/o-auth/access-token';
import { OAuthDeleteAccessTokenByIdService } from '@app/o-auth/access-token/application/delete/o-auth-delete-access-token-by-id.service';
import { OAuthAccessTokenId } from '@app/o-auth/access-token/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(OAuthDeleteAccessTokenByIdCommand)
export class OAuthDeleteAccessTokenByIdCommandHandler
    implements ICommandHandler<OAuthDeleteAccessTokenByIdCommand>
{
    constructor(
        private readonly deleteAccessTokenByIdService: OAuthDeleteAccessTokenByIdService,
    ) {}

    async execute(command: OAuthDeleteAccessTokenByIdCommand): Promise<void> {
        // call to use case and implements ValueObjects
        await this.deleteAccessTokenByIdService.main(
            new OAuthAccessTokenId(command.id),
            command.constraint,
            command.cQMetadata,
        );
    }
}
