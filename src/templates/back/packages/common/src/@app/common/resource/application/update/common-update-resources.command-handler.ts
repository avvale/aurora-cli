/* eslint-disable key-spacing */
import { CommonUpdateResourcesCommand } from '@app/common/resource';
import { CommonUpdateResourcesService } from '@app/common/resource/application/update/common-update-resources.service';
import {
  CommonResourceCode,
  CommonResourceHasAttachments,
  CommonResourceId,
  CommonResourceIsActive,
  CommonResourceName,
} from '@app/common/resource/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(CommonUpdateResourcesCommand)
export class CommonUpdateResourcesCommandHandler
  implements ICommandHandler<CommonUpdateResourcesCommand>
{
  constructor(
    private readonly updateResourcesService: CommonUpdateResourcesService,
  ) {}

  async execute(command: CommonUpdateResourcesCommand): Promise<void> {
    // call to use case and implements ValueObjects
    await this.updateResourcesService.main(
      {
        id: new CommonResourceId(command.payload.id, { undefinable: true }),
        code: new CommonResourceCode(command.payload.code, {
          undefinable: true,
        }),
        name: new CommonResourceName(command.payload.name, {
          undefinable: true,
        }),
        isActive: new CommonResourceIsActive(command.payload.isActive, {
          undefinable: true,
        }),
        hasAttachments: new CommonResourceHasAttachments(
          command.payload.hasAttachments,
          { undefinable: true },
        ),
      },
      command.queryStatement,
      command.constraint,
      command.cQMetadata,
    );
  }
}
