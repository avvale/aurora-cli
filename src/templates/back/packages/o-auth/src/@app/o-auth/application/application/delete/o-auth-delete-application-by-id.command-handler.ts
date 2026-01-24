import { OAuthDeleteApplicationByIdCommand } from '@app/o-auth/application';
import { OAuthDeleteApplicationByIdService } from '@app/o-auth/application/application/delete/o-auth-delete-application-by-id.service';
import { OAuthApplicationId } from '@app/o-auth/application/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(OAuthDeleteApplicationByIdCommand)
export class OAuthDeleteApplicationByIdCommandHandler
  implements ICommandHandler<OAuthDeleteApplicationByIdCommand>
{
  constructor(
    private readonly deleteApplicationByIdService: OAuthDeleteApplicationByIdService,
  ) {}

  async execute(command: OAuthDeleteApplicationByIdCommand): Promise<void> {
    // call to use case and implements ValueObjects
    await this.deleteApplicationByIdService.main(
      new OAuthApplicationId(command.id),
      command.constraint,
      command.cQMetadata,
    );
  }
}
