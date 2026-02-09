/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-1.aurora.yaml
 */
import { CommonDeleteAdministrativeAreaLevel1ByIdCommand } from '@app/common/administrative-area-level-1';
import { CommonDeleteAdministrativeAreaLevel1ByIdService } from '@app/common/administrative-area-level-1/application/delete/common-delete-administrative-area-level-1-by-id.service';
import { CommonAdministrativeAreaLevel1Id } from '@app/common/administrative-area-level-1/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(CommonDeleteAdministrativeAreaLevel1ByIdCommand)
export class CommonDeleteAdministrativeAreaLevel1ByIdCommandHandler
  implements ICommandHandler<CommonDeleteAdministrativeAreaLevel1ByIdCommand>
{
  constructor(
    private readonly deleteAdministrativeAreaLevel1ByIdService: CommonDeleteAdministrativeAreaLevel1ByIdService,
  ) {}

  async execute(
    command: CommonDeleteAdministrativeAreaLevel1ByIdCommand,
  ): Promise<void> {
    // call to use case and implements ValueObjects
    await this.deleteAdministrativeAreaLevel1ByIdService.main(
      new CommonAdministrativeAreaLevel1Id(command.id),
      command.constraint,
      command.cQMetadata,
    );
  }
}
