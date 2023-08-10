/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { OAuthUpsertClientCommand } from './o-auth-upsert-client.command';
import { OAuthUpsertClientService } from './o-auth-upsert-client.service';
import {
    OAuthClientId,
    OAuthClientGrantType,
    OAuthClientName,
    OAuthClientSecret,
    OAuthClientAuthUrl,
    OAuthClientRedirect,
    OAuthClientScopeOptions,
    OAuthClientExpiredAccessToken,
    OAuthClientExpiredRefreshToken,
    OAuthClientIsActive,
    OAuthClientIsMaster,
    OAuthClientApplicationIds,
    OAuthClientCreatedAt,
    OAuthClientUpdatedAt,
    OAuthClientDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(OAuthUpsertClientCommand)
export class OAuthUpsertClientCommandHandler implements ICommandHandler<OAuthUpsertClientCommand>
{
    constructor(
        private readonly upsertClientService: OAuthUpsertClientService,
    ) {}

    async execute(command: OAuthUpsertClientCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.upsertClientService.main(
            {
                id: new OAuthClientId(command.payload.id),
                grantType: new OAuthClientGrantType(command.payload.grantType),
                name: new OAuthClientName(command.payload.name),
                secret: new OAuthClientSecret(command.payload.secret),
                authUrl: new OAuthClientAuthUrl(command.payload.authUrl),
                redirect: new OAuthClientRedirect(command.payload.redirect),
                scopeOptions: new OAuthClientScopeOptions(command.payload.scopeOptions),
                expiredAccessToken: new OAuthClientExpiredAccessToken(command.payload.expiredAccessToken),
                expiredRefreshToken: new OAuthClientExpiredRefreshToken(command.payload.expiredRefreshToken),
                isActive: new OAuthClientIsActive(command.payload.isActive),
                isMaster: new OAuthClientIsMaster(command.payload.isMaster),
                applicationIds: new OAuthClientApplicationIds(command.payload.applicationIds),
            },
            command.cQMetadata,
        );
    }
}
