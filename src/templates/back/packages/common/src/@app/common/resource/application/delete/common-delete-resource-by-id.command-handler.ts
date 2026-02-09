/**
 * @aurora-generated
 * @source cliter/common/resource.aurora.yaml
 */
import { CommonDeleteResourceByIdCommand } from '@app/common/resource';
import { CommonDeleteResourceByIdService } from '@app/common/resource/application/delete/common-delete-resource-by-id.service';
import { CommonResourceId } from '@app/common/resource/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(CommonDeleteResourceByIdCommand)
export class CommonDeleteResourceByIdCommandHandler
  implements ICommandHandler<CommonDeleteResourceByIdCommand>
{
  constructor(
    private readonly deleteResourceByIdService: CommonDeleteResourceByIdService,
  ) {}

  async execute(command: CommonDeleteResourceByIdCommand): Promise<void> {
    // call to use case and implements ValueObjects
    await this.deleteResourceByIdService.main(
      new CommonResourceId(command.id),
      command.constraint,
      command.cQMetadata,
    );
  }
}
