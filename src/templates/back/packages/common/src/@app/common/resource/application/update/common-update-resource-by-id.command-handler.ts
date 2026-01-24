/* eslint-disable key-spacing */
import { CommonUpdateResourceByIdCommand } from '@app/common/resource';
import { CommonUpdateResourceByIdService } from '@app/common/resource/application/update/common-update-resource-by-id.service';
import {
  CommonResourceCode,
  CommonResourceHasAttachments,
  CommonResourceId,
  CommonResourceIsActive,
  CommonResourceName,
} from '@app/common/resource/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(CommonUpdateResourceByIdCommand)
export class CommonUpdateResourceByIdCommandHandler
  implements ICommandHandler<CommonUpdateResourceByIdCommand>
{
  constructor(
    private readonly updateResourceByIdService: CommonUpdateResourceByIdService,
  ) {}

  async execute(command: CommonUpdateResourceByIdCommand): Promise<void> {
    // call to use case and implements ValueObjects
    await this.updateResourceByIdService.main(
      {
        id: new CommonResourceId(command.payload.id),
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
      command.constraint,
      command.cQMetadata,
    );
  }
}
