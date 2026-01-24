/* eslint-disable key-spacing */
import { OAuthCreateApplicationCommand } from '@app/o-auth/application';
import { OAuthCreateApplicationService } from '@app/o-auth/application/application/create/o-auth-create-application.service';
import {
  OAuthApplicationClientIds,
  OAuthApplicationCode,
  OAuthApplicationId,
  OAuthApplicationIsMaster,
  OAuthApplicationName,
  OAuthApplicationSecret,
} from '@app/o-auth/application/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(OAuthCreateApplicationCommand)
export class OAuthCreateApplicationCommandHandler
  implements ICommandHandler<OAuthCreateApplicationCommand>
{
  constructor(
    private readonly createApplicationService: OAuthCreateApplicationService,
  ) {}

  async execute(command: OAuthCreateApplicationCommand): Promise<void> {
    // call to use case and implements ValueObjects
    await this.createApplicationService.main(
      {
        id: new OAuthApplicationId(command.payload.id),
        code: new OAuthApplicationCode(command.payload.code),
        name: new OAuthApplicationName(command.payload.name),
        secret: new OAuthApplicationSecret(command.payload.secret),
        isMaster: new OAuthApplicationIsMaster(command.payload.isMaster),
        clientIds: new OAuthApplicationClientIds(command.payload.clientIds),
      },
      command.cQMetadata,
    );
  }
}
