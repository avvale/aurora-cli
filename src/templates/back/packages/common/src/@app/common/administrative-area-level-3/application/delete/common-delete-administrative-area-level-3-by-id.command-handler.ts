/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-3.aurora.yaml
 */
import { CommonDeleteAdministrativeAreaLevel3ByIdCommand } from '@app/common/administrative-area-level-3';
import { CommonDeleteAdministrativeAreaLevel3ByIdService } from '@app/common/administrative-area-level-3/application/delete/common-delete-administrative-area-level-3-by-id.service';
import { CommonAdministrativeAreaLevel3Id } from '@app/common/administrative-area-level-3/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(CommonDeleteAdministrativeAreaLevel3ByIdCommand)
export class CommonDeleteAdministrativeAreaLevel3ByIdCommandHandler
  implements ICommandHandler<CommonDeleteAdministrativeAreaLevel3ByIdCommand>
{
  constructor(
    private readonly deleteAdministrativeAreaLevel3ByIdService: CommonDeleteAdministrativeAreaLevel3ByIdService,
  ) {}

  async execute(
    command: CommonDeleteAdministrativeAreaLevel3ByIdCommand,
  ): Promise<void> {
    // call to use case and implements ValueObjects
    await this.deleteAdministrativeAreaLevel3ByIdService.main(
      new CommonAdministrativeAreaLevel3Id(command.id),
      command.constraint,
      command.cQMetadata,
    );
  }
}
