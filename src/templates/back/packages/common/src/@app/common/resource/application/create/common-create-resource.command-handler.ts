/**
 * @aurora-generated
 * @source cliter/common/resource.aurora.yaml
 */
import { CommonCreateResourceCommand } from '@app/common/resource';
import { CommonCreateResourceService } from '@app/common/resource/application/create/common-create-resource.service';
import {
  CommonResourceCode,
  CommonResourceHasAttachments,
  CommonResourceId,
  CommonResourceIsActive,
  CommonResourceName,
} from '@app/common/resource/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(CommonCreateResourceCommand)
export class CommonCreateResourceCommandHandler
  implements ICommandHandler<CommonCreateResourceCommand>
{
  constructor(
    private readonly createResourceService: CommonCreateResourceService,
  ) {}

  async execute(command: CommonCreateResourceCommand): Promise<void> {
    // call to use case and implements ValueObjects
    await this.createResourceService.main(
      {
        id: new CommonResourceId(command.payload.id),
        code: new CommonResourceCode(command.payload.code),
        name: new CommonResourceName(command.payload.name),
        isActive: new CommonResourceIsActive(command.payload.isActive),
        hasAttachments: new CommonResourceHasAttachments(
          command.payload.hasAttachments,
        ),
      },
      command.cQMetadata,
    );
  }
}
