import { CommonDeleteAttachmentsCommand } from '@app/common/attachment';
import { CommonDeleteAttachmentsService } from '@app/common/attachment/application/delete/common-delete-attachments.service';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(CommonDeleteAttachmentsCommand)
export class CommonDeleteAttachmentsCommandHandler
  implements ICommandHandler<CommonDeleteAttachmentsCommand>
{
  constructor(
    private readonly deleteAttachmentsService: CommonDeleteAttachmentsService,
  ) {}

  async execute(command: CommonDeleteAttachmentsCommand): Promise<void> {
    // call to use case and implements ValueObjects
    await this.deleteAttachmentsService.main(
      command.queryStatement,
      command.constraint,
      command.cQMetadata,
    );
  }
}
