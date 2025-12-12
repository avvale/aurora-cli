/* eslint-disable key-spacing */
import { SupportUpdateCommentByIdCommand } from '@app/support/comment';
import { SupportUpdateCommentByIdService } from '@app/support/comment/application/update/support-update-comment-by-id.service';
import {
    SupportCommentAccountId,
    SupportCommentAccountUsername,
    SupportCommentAttachments,
    SupportCommentDescription,
    SupportCommentDisplayName,
    SupportCommentExternalId,
    SupportCommentExternalParentId,
    SupportCommentId,
    SupportCommentIssueId,
    SupportCommentMeta,
    SupportCommentParentId,
    SupportCommentScreenRecording,
} from '@app/support/comment/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(SupportUpdateCommentByIdCommand)
export class SupportUpdateCommentByIdCommandHandler
    implements ICommandHandler<SupportUpdateCommentByIdCommand>
{
    constructor(
        private readonly updateCommentByIdService: SupportUpdateCommentByIdService,
    ) {}

    async execute(command: SupportUpdateCommentByIdCommand): Promise<void> {
        // call to use case and implements ValueObjects
        await this.updateCommentByIdService.main(
            {
                id: new SupportCommentId(command.payload.id),
                parentId: new SupportCommentParentId(command.payload.parentId),
                externalId: new SupportCommentExternalId(
                    command.payload.externalId,
                ),
                externalParentId: new SupportCommentExternalParentId(
                    command.payload.externalParentId,
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
                    { undefinable: true },
                ),
                attachments: new SupportCommentAttachments(
                    command.payload.attachments,
                ),
                screenRecording: new SupportCommentScreenRecording(
                    command.payload.screenRecording,
                ),
                meta: new SupportCommentMeta(command.payload.meta),
            },
            command.constraint,
            command.cQMetadata,
        );
    }
}
