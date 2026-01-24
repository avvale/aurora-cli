import { CommonDeleteAttachmentFamiliesCommand } from '@app/common/attachment-family';
import { CommonDeleteAttachmentFamiliesService } from '@app/common/attachment-family/application/delete/common-delete-attachment-families.service';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(CommonDeleteAttachmentFamiliesCommand)
export class CommonDeleteAttachmentFamiliesCommandHandler
  implements ICommandHandler<CommonDeleteAttachmentFamiliesCommand>
{
  constructor(
    private readonly deleteAttachmentFamiliesService: CommonDeleteAttachmentFamiliesService,
  ) {}

  async execute(command: CommonDeleteAttachmentFamiliesCommand): Promise<void> {
    // call to use case and implements ValueObjects
    await this.deleteAttachmentFamiliesService.main(
      command.queryStatement,
      command.constraint,
      command.cQMetadata,
    );
  }
}
