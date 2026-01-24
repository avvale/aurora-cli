import { CommonDeleteAttachmentFamilyByIdCommand } from '@app/common/attachment-family';
import { CommonDeleteAttachmentFamilyByIdService } from '@app/common/attachment-family/application/delete/common-delete-attachment-family-by-id.service';
import { CommonAttachmentFamilyId } from '@app/common/attachment-family/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(CommonDeleteAttachmentFamilyByIdCommand)
export class CommonDeleteAttachmentFamilyByIdCommandHandler
  implements ICommandHandler<CommonDeleteAttachmentFamilyByIdCommand>
{
  constructor(
    private readonly deleteAttachmentFamilyByIdService: CommonDeleteAttachmentFamilyByIdService,
  ) {}

  async execute(
    command: CommonDeleteAttachmentFamilyByIdCommand,
  ): Promise<void> {
    // call to use case and implements ValueObjects
    await this.deleteAttachmentFamilyByIdService.main(
      new CommonAttachmentFamilyId(command.id),
      command.constraint,
      command.cQMetadata,
    );
  }
}
