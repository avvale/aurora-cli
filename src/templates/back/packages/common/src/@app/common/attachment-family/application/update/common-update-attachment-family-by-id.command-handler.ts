/* eslint-disable key-spacing */
import { CommonUpdateAttachmentFamilyByIdCommand } from '@app/common/attachment-family';
import { CommonUpdateAttachmentFamilyByIdService } from '@app/common/attachment-family/application/update/common-update-attachment-family-by-id.service';
import {
  CommonAttachmentFamilyCode,
  CommonAttachmentFamilyFitType,
  CommonAttachmentFamilyFormat,
  CommonAttachmentFamilyHeight,
  CommonAttachmentFamilyId,
  CommonAttachmentFamilyName,
  CommonAttachmentFamilyQuality,
  CommonAttachmentFamilyResourceId,
  CommonAttachmentFamilySizes,
  CommonAttachmentFamilyWidth,
} from '@app/common/attachment-family/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(CommonUpdateAttachmentFamilyByIdCommand)
export class CommonUpdateAttachmentFamilyByIdCommandHandler
  implements ICommandHandler<CommonUpdateAttachmentFamilyByIdCommand>
{
  constructor(
    private readonly updateAttachmentFamilyByIdService: CommonUpdateAttachmentFamilyByIdService,
  ) {}

  async execute(
    command: CommonUpdateAttachmentFamilyByIdCommand,
  ): Promise<void> {
    // call to use case and implements ValueObjects
    await this.updateAttachmentFamilyByIdService.main(
      {
        id: new CommonAttachmentFamilyId(command.payload.id),
        resourceId: new CommonAttachmentFamilyResourceId(
          command.payload.resourceId,
          { undefinable: true },
        ),
        code: new CommonAttachmentFamilyCode(command.payload.code, {
          undefinable: true,
        }),
        name: new CommonAttachmentFamilyName(command.payload.name, {
          undefinable: true,
        }),
        width: new CommonAttachmentFamilyWidth(command.payload.width),
        height: new CommonAttachmentFamilyHeight(command.payload.height),
        fitType: new CommonAttachmentFamilyFitType(command.payload.fitType),
        quality: new CommonAttachmentFamilyQuality(command.payload.quality),
        sizes: new CommonAttachmentFamilySizes(command.payload.sizes),
        format: new CommonAttachmentFamilyFormat(command.payload.format),
      },
      command.constraint,
      command.cQMetadata,
    );
  }
}
