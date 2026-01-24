/* eslint-disable key-spacing */
import { OAuthCreateClientCommand } from '@app/o-auth/client';
import { OAuthCreateClientService } from '@app/o-auth/client/application/create/o-auth-create-client.service';
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

@CommandHandler(OAuthCreateClientCommand)
export class OAuthCreateClientCommandHandler
  implements ICommandHandler<OAuthCreateClientCommand>
{
  constructor(private readonly createClientService: OAuthCreateClientService) {}

  async execute(command: OAuthCreateClientCommand): Promise<void> {
    // call to use case and implements ValueObjects
    await this.createClientService.main(
      {
        id: new OAuthClientId(command.payload.id),
        grantType: new OAuthClientGrantType(command.payload.grantType),
        name: new OAuthClientName(command.payload.name),
        secret: new OAuthClientSecret(command.payload.secret),
        authUrl: new OAuthClientAuthUrl(command.payload.authUrl),
        redirect: new OAuthClientRedirect(command.payload.redirect),
        scopeOptions: new OAuthClientScopeOptions(command.payload.scopeOptions),
        expiredAccessToken: new OAuthClientExpiredAccessToken(
          command.payload.expiredAccessToken,
        ),
        expiredRefreshToken: new OAuthClientExpiredRefreshToken(
          command.payload.expiredRefreshToken,
        ),
        isActive: new OAuthClientIsActive(command.payload.isActive),
        isMaster: new OAuthClientIsMaster(command.payload.isMaster),
        applicationIds: new OAuthClientApplicationIds(
          command.payload.applicationIds,
        ),
      },
      command.cQMetadata,
    );
  }
}
