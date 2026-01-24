import { OAuthDeleteAccessTokensCommand } from '@app/o-auth/access-token';
import { OAuthDeleteAccessTokensService } from '@app/o-auth/access-token/application/delete/o-auth-delete-access-tokens.service';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(OAuthDeleteAccessTokensCommand)
export class OAuthDeleteAccessTokensCommandHandler
  implements ICommandHandler<OAuthDeleteAccessTokensCommand>
{
  constructor(
    private readonly deleteAccessTokensService: OAuthDeleteAccessTokensService,
  ) {}

  async execute(command: OAuthDeleteAccessTokensCommand): Promise<void> {
    // call to use case and implements ValueObjects
    await this.deleteAccessTokensService.main(
      command.queryStatement,
      command.constraint,
      command.cQMetadata,
    );
  }
}
