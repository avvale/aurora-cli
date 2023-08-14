/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { OAuthUpdateClientByIdCommand } from './o-auth-update-client-by-id.command';
import { OAuthUpdateClientByIdService } from './o-auth-update-client-by-id.service';
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

@CommandHandler(OAuthUpdateClientByIdCommand)
export class OAuthUpdateClientByIdCommandHandler implements ICommandHandler<OAuthUpdateClientByIdCommand>
{
    constructor(
        private readonly updateClientByIdService: OAuthUpdateClientByIdService,
    ) {}

    async execute(command: OAuthUpdateClientByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateClientByIdService.main(
            {
                id: new OAuthClientId(command.payload.id),
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
            command.constraint,
            command.cQMetadata,
        );
    }
}
