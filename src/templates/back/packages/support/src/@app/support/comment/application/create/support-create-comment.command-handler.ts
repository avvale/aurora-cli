/* eslint-disable key-spacing */
import { SupportCreateCommentCommand } from '@app/support/comment';
import { SupportCreateCommentService } from '@app/support/comment/application/create/support-create-comment.service';
import {
    SupportCommentAccountId,
    SupportCommentAccountUsername,
    SupportCommentAttachments,
    SupportCommentDescription,
    SupportCommentDisplayName,
    SupportCommentExternalId,
    SupportCommentId,
    SupportCommentIssueId,
    SupportCommentMeta,
    SupportCommentScreenRecording,
} from '@app/support/comment/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(SupportCreateCommentCommand)
export class SupportCreateCommentCommandHandler
    implements ICommandHandler<SupportCreateCommentCommand>
{
    constructor(
        private readonly createCommentService: SupportCreateCommentService,
    ) {}

    async execute(command: SupportCreateCommentCommand): Promise<void> {
        // call to use case and implements ValueObjects
        await this.createCommentService.main(
            {
                id: new SupportCommentId(command.payload.id),
                externalId: new SupportCommentExternalId(
                    command.payload.externalId,
                ),
                issueId: new SupportCommentIssueId(command.payload.issueId),
                accountId: new SupportCommentAccountId(
                    command.payload.accountId,
                ),
                accountUsername: new SupportCommentAccountUsername(
                    command.payload.accountUsername,
                ),
                displayName: new SupportCommentDisplayName(
                    command.payload.displayName,
                ),
                description: new SupportCommentDescription(
                    command.payload.description,
                ),
                attachments: new SupportCommentAttachments(
                    command.payload.attachments,
                ),
                screenRecording: new SupportCommentScreenRecording(
                    command.payload.screenRecording,
                ),
                meta: new SupportCommentMeta(command.payload.meta),
            },
            command.cQMetadata,
        );
    }
}
