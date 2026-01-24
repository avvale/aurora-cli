/* eslint-disable key-spacing */
import { SupportUpdateCommentsCommand } from '@app/support/comment';
import { SupportUpdateCommentsService } from '@app/support/comment/application/update/support-update-comments.service';
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

@CommandHandler(SupportUpdateCommentsCommand)
export class SupportUpdateCommentsCommandHandler
  implements ICommandHandler<SupportUpdateCommentsCommand>
{
  constructor(
    private readonly updateCommentsService: SupportUpdateCommentsService,
  ) {}

  async execute(command: SupportUpdateCommentsCommand): Promise<void> {
    // call to use case and implements ValueObjects
    await this.updateCommentsService.main(
      {
        id: new SupportCommentId(command.payload.id, {
          undefinable: true,
        }),
        parentId: new SupportCommentParentId(command.payload.parentId),
        externalId: new SupportCommentExternalId(command.payload.externalId),
        externalParentId: new SupportCommentExternalParentId(
          command.payload.externalParentId,
        ),
        issueId: new SupportCommentIssueId(command.payload.issueId),
        accountId: new SupportCommentAccountId(command.payload.accountId),
        accountUsername: new SupportCommentAccountUsername(
          command.payload.accountUsername,
        ),
        displayName: new SupportCommentDisplayName(command.payload.displayName),
        description: new SupportCommentDescription(
          command.payload.description,
          { undefinable: true },
        ),
        attachments: new SupportCommentAttachments(command.payload.attachments),
        screenRecording: new SupportCommentScreenRecording(
          command.payload.screenRecording,
        ),
        meta: new SupportCommentMeta(command.payload.meta),
      },
      command.queryStatement,
      command.constraint,
      command.cQMetadata,
    );
  }
}
