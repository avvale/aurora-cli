import { CommonDeleteAdministrativeAreasLevel3Command } from '@app/common/administrative-area-level-3';
import { CommonDeleteAdministrativeAreasLevel3Service } from '@app/common/administrative-area-level-3/application/delete/common-delete-administrative-areas-level-3.service';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(CommonDeleteAdministrativeAreasLevel3Command)
export class CommonDeleteAdministrativeAreasLevel3CommandHandler
  implements ICommandHandler<CommonDeleteAdministrativeAreasLevel3Command>
{
  constructor(
    private readonly deleteAdministrativeAreasLevel3Service: CommonDeleteAdministrativeAreasLevel3Service,
  ) {}

  async execute(
    command: CommonDeleteAdministrativeAreasLevel3Command,
  ): Promise<void> {
    // call to use case and implements ValueObjects
    await this.deleteAdministrativeAreasLevel3Service.main(
      command.queryStatement,
      command.constraint,
      command.cQMetadata,
    );
  }
}
