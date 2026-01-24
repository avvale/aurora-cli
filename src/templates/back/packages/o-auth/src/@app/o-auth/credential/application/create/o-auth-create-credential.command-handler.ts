/* eslint-disable key-spacing */
import { OAuthCreateCredentialCommand } from '@app/o-auth/credential';
import { OAuthCreateCredentialService } from '@app/o-auth/credential/application/create/o-auth-create-credential.service';
import {
  OAuthCredentialAccessTokenId,
  OAuthCredentialAccountId,
  OAuthCredentialClientSecret,
  OAuthCredentialGrantType,
  OAuthCredentialRedirect,
  OAuthCredentialRefreshToken,
  OAuthCredentialUsername,
} from '@app/o-auth/credential/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(OAuthCreateCredentialCommand)
export class OAuthCreateCredentialCommandHandler
  implements ICommandHandler<OAuthCreateCredentialCommand>
{
  constructor(
    private readonly createCredentialService: OAuthCreateCredentialService,
  ) {}

  async execute(command: OAuthCreateCredentialCommand): Promise<void> {
    // call to use case and implements ValueObjects
    await this.createCredentialService.main(
      {
        grantType: new OAuthCredentialGrantType(command.payload.grantType),
        accountId: new OAuthCredentialAccountId(command.payload.accountId),
        username: new OAuthCredentialUsername(command.payload.username),
        clientSecret: new OAuthCredentialClientSecret(
          command.payload.clientSecret,
        ),
        accessTokenId: new OAuthCredentialAccessTokenId(
          command.payload.accessTokenId,
        ),
        refreshToken: new OAuthCredentialRefreshToken(
          command.payload.refreshToken,
        ),
        redirect: new OAuthCredentialRedirect(command.payload.redirect),
      },
      command.cQMetadata,
    );
  }
}
