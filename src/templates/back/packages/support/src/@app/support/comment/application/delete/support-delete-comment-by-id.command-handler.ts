import { SupportDeleteCommentByIdCommand } from '@app/support/comment';
import { SupportDeleteCommentByIdService } from '@app/support/comment/application/delete/support-delete-comment-by-id.service';
import { SupportCommentId } from '@app/support/comment/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(SupportDeleteCommentByIdCommand)
export class SupportDeleteCommentByIdCommandHandler
    implements ICommandHandler<SupportDeleteCommentByIdCommand>
{
    constructor(
        private readonly deleteCommentByIdService: SupportDeleteCommentByIdService,
    ) {}

    async execute(command: SupportDeleteCommentByIdCommand): Promise<void> {
        // call to use case and implements ValueObjects
        await this.deleteCommentByIdService.main(
            new SupportCommentId(command.id),
            command.constraint,
            command.cQMetadata,
        );
    }
}
