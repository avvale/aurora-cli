import { SupportDeleteCommentsCommand } from '@app/support/comment';
import { SupportDeleteCommentsService } from '@app/support/comment/application/delete/support-delete-comments.service';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(SupportDeleteCommentsCommand)
export class SupportDeleteCommentsCommandHandler
    implements ICommandHandler<SupportDeleteCommentsCommand>
{
    constructor(
        private readonly deleteCommentsService: SupportDeleteCommentsService,
    ) {}

    async execute(command: SupportDeleteCommentsCommand): Promise<void> {
        // call to use case and implements ValueObjects
        await this.deleteCommentsService.main(
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
