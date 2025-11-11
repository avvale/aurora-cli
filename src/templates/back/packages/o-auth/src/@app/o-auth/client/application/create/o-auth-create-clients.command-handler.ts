/* eslint-disable key-spacing */
import { OAuthCreateClientsCommand } from '@app/o-auth/client';
import { OAuthCreateClientsService } from '@app/o-auth/client/application/create/o-auth-create-clients.service';
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

@CommandHandler(OAuthCreateClientsCommand)
export class OAuthCreateClientsCommandHandler
    implements ICommandHandler<OAuthCreateClientsCommand>
{
    constructor(
        private readonly createClientsService: OAuthCreateClientsService,
    ) {}

    async execute(command: OAuthCreateClientsCommand): Promise<void> {
        // call to use case and implements ValueObjects
        await this.createClientsService.main(
            command.payload.map((client) => {
                return {
                    id: new OAuthClientId(client.id),
                    grantType: new OAuthClientGrantType(client.grantType),
                    name: new OAuthClientName(client.name),
                    secret: new OAuthClientSecret(client.secret),
                    authUrl: new OAuthClientAuthUrl(client.authUrl),
                    redirect: new OAuthClientRedirect(client.redirect),
                    scopeOptions: new OAuthClientScopeOptions(
                        client.scopeOptions,
                    ),
                    expiredAccessToken: new OAuthClientExpiredAccessToken(
                        client.expiredAccessToken,
                    ),
                    expiredRefreshToken: new OAuthClientExpiredRefreshToken(
                        client.expiredRefreshToken,
                    ),
                    isActive: new OAuthClientIsActive(client.isActive),
                    isMaster: new OAuthClientIsMaster(client.isMaster),
                    applicationIds: new OAuthClientApplicationIds(
                        client.applicationIds,
                    ),
                };
            }),
            command.cQMetadata,
        );
    }
}
