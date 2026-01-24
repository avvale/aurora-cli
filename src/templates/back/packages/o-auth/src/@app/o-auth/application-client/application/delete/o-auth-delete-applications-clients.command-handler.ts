import { OAuthDeleteApplicationsClientsCommand } from '@app/o-auth/application-client';
import { OAuthDeleteApplicationsClientsService } from '@app/o-auth/application-client/application/delete/o-auth-delete-applications-clients.service';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(OAuthDeleteApplicationsClientsCommand)
export class OAuthDeleteApplicationsClientsCommandHandler
  implements ICommandHandler<OAuthDeleteApplicationsClientsCommand>
{
  constructor(
    private readonly deleteApplicationsClientsService: OAuthDeleteApplicationsClientsService,
  ) {}

  async execute(command: OAuthDeleteApplicationsClientsCommand): Promise<void> {
    // call to use case and implements ValueObjects
    await this.deleteApplicationsClientsService.main(
      command.queryStatement,
      command.constraint,
      command.cQMetadata,
    );
  }
}
