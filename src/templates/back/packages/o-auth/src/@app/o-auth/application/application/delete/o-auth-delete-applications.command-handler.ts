import { OAuthDeleteApplicationsCommand } from '@app/o-auth/application';
import { OAuthDeleteApplicationsService } from '@app/o-auth/application/application/delete/o-auth-delete-applications.service';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(OAuthDeleteApplicationsCommand)
export class OAuthDeleteApplicationsCommandHandler
  implements ICommandHandler<OAuthDeleteApplicationsCommand>
{
  constructor(
    private readonly deleteApplicationsService: OAuthDeleteApplicationsService,
  ) {}

  async execute(command: OAuthDeleteApplicationsCommand): Promise<void> {
    // call to use case and implements ValueObjects
    await this.deleteApplicationsService.main(
      command.queryStatement,
      command.constraint,
      command.cQMetadata,
    );
  }
}
