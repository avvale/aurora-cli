import { CommonDeleteAttachmentLibraryByIdCommand } from '@app/common/attachment-library';
import { CommonDeleteAttachmentLibraryByIdService } from '@app/common/attachment-library/application/delete/common-delete-attachment-library-by-id.service';
import { CommonAttachmentLibraryId } from '@app/common/attachment-library/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(CommonDeleteAttachmentLibraryByIdCommand)
export class CommonDeleteAttachmentLibraryByIdCommandHandler
  implements ICommandHandler<CommonDeleteAttachmentLibraryByIdCommand>
{
  constructor(
    private readonly deleteAttachmentLibraryByIdService: CommonDeleteAttachmentLibraryByIdService,
  ) {}

  async execute(
    command: CommonDeleteAttachmentLibraryByIdCommand,
  ): Promise<void> {
    // call to use case and implements ValueObjects
    await this.deleteAttachmentLibraryByIdService.main(
      new CommonAttachmentLibraryId(command.id),
      command.constraint,
      command.cQMetadata,
    );
  }
}
