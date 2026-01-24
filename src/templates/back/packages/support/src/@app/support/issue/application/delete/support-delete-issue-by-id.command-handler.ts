import { SupportDeleteIssueByIdCommand } from '@app/support/issue';
import { SupportDeleteIssueByIdService } from '@app/support/issue/application/delete/support-delete-issue-by-id.service';
import { SupportIssueId } from '@app/support/issue/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(SupportDeleteIssueByIdCommand)
export class SupportDeleteIssueByIdCommandHandler
  implements ICommandHandler<SupportDeleteIssueByIdCommand>
{
  constructor(
    private readonly deleteIssueByIdService: SupportDeleteIssueByIdService,
  ) {}

  async execute(command: SupportDeleteIssueByIdCommand): Promise<void> {
    // call to use case and implements ValueObjects
    await this.deleteIssueByIdService.main(
      new SupportIssueId(command.id),
      command.constraint,
      command.cQMetadata,
    );
  }
}
