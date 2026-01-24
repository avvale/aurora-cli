/* eslint-disable key-spacing */
import { CommonCreateResourcesCommand } from '@app/common/resource';
import { CommonCreateResourcesService } from '@app/common/resource/application/create/common-create-resources.service';
import {
  CommonResourceCode,
  CommonResourceHasAttachments,
  CommonResourceId,
  CommonResourceIsActive,
  CommonResourceName,
} from '@app/common/resource/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(CommonCreateResourcesCommand)
export class CommonCreateResourcesCommandHandler
  implements ICommandHandler<CommonCreateResourcesCommand>
{
  constructor(
    private readonly createResourcesService: CommonCreateResourcesService,
  ) {}

  async execute(command: CommonCreateResourcesCommand): Promise<void> {
    // call to use case and implements ValueObjects
    await this.createResourcesService.main(
      command.payload.map((resource) => {
        return {
          id: new CommonResourceId(resource.id),
          code: new CommonResourceCode(resource.code),
          name: new CommonResourceName(resource.name),
          isActive: new CommonResourceIsActive(resource.isActive),
          hasAttachments: new CommonResourceHasAttachments(
            resource.hasAttachments,
          ),
        };
      }),
      command.cQMetadata,
    );
  }
}
