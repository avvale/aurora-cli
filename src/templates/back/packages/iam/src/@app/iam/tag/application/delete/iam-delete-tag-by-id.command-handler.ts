import { IamDeleteTagByIdCommand } from '@app/iam/tag';
import { IamDeleteTagByIdService } from '@app/iam/tag/application/delete/iam-delete-tag-by-id.service';
import { IamTagId } from '@app/iam/tag/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(IamDeleteTagByIdCommand)
export class IamDeleteTagByIdCommandHandler
  implements ICommandHandler<IamDeleteTagByIdCommand>
{
  constructor(private readonly deleteTagByIdService: IamDeleteTagByIdService) {}

  async execute(command: IamDeleteTagByIdCommand): Promise<void> {
    // call to use case and implements ValueObjects
    await this.deleteTagByIdService.main(
      new IamTagId(command.id),
      command.constraint,
      command.cQMetadata,
    );
  }
}
