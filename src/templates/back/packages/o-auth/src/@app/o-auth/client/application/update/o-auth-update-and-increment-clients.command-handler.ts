/* eslint-disable key-spacing */
import { OAuthUpdateAndIncrementClientsCommand } from '@app/o-auth/client';
import { OAuthUpdateAndIncrementClientsService } from '@app/o-auth/client/application/update/o-auth-update-and-increment-clients.service';
import {
    OAuthClientApplicationIds,
    OAuthClientAuthUrl,
    OAuthClientExpiredAccessToken,
    OAuthClientExpiredRefreshToken,
    OAuthClientGrantType,
    OAuthClientId,
    OAuthClientIsActive,
    OAuthClientIsMaster,
    OAuthClientName,
    OAuthClientRedirect,
    OAuthClientScopeOptions,
    OAuthClientSecret,
} from '@app/o-auth/client/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(OAuthUpdateAndIncrementClientsCommand)
export class OAuthUpdateAndIncrementClientsCommandHandler implements ICommandHandler<OAuthUpdateAndIncrementClientsCommand>
{
    constructor(
        private readonly updateClientsService: OAuthUpdateAndIncrementClientsService,
    ) {}

    async execute(command: OAuthUpdateAndIncrementClientsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateClientsService.main(
            {
                id: new OAuthClientId(command.payload.id, { undefinable: true }),
                grantType: new OAuthClientGrantType(command.payload.grantType, { undefinable: true }),
                name: new OAuthClientName(command.payload.name, { undefinable: true }),
                secret: new OAuthClientSecret(command.payload.secret, { undefinable: true }),
                authUrl: new OAuthClientAuthUrl(command.payload.authUrl),
                redirect: new OAuthClientRedirect(command.payload.redirect),
                scopeOptions: new OAuthClientScopeOptions(command.payload.scopeOptions),
                expiredAccessToken: new OAuthClientExpiredAccessToken(command.payload.expiredAccessToken),
                expiredRefreshToken: new OAuthClientExpiredRefreshToken(command.payload.expiredRefreshToken),
                isActive: new OAuthClientIsActive(command.payload.isActive, { undefinable: true }),
                isMaster: new OAuthClientIsMaster(command.payload.isMaster, { undefinable: true }),
                applicationIds: new OAuthClientApplicationIds(command.payload.applicationIds),
            },
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
