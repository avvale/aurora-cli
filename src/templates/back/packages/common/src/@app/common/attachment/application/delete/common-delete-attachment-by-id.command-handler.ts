import { CommonDeleteAttachmentByIdCommand } from '@app/common/attachment';
import { CommonDeleteAttachmentByIdService } from '@app/common/attachment/application/delete/common-delete-attachment-by-id.service';
import { CommonAttachmentId } from '@app/common/attachment/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(CommonDeleteAttachmentByIdCommand)
export class CommonDeleteAttachmentByIdCommandHandler
  implements ICommandHandler<CommonDeleteAttachmentByIdCommand>
{
  constructor(
    private readonly deleteAttachmentByIdService: CommonDeleteAttachmentByIdService,
  ) {}

  async execute(command: CommonDeleteAttachmentByIdCommand): Promise<void> {
    // call to use case and implements ValueObjects
    await this.deleteAttachmentByIdService.main(
      new CommonAttachmentId(command.id),
      command.constraint,
      command.cQMetadata,
    );
  }
}
