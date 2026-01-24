/* eslint-disable key-spacing */
import { SupportUpdateIssueByIdCommand } from '@app/support/issue';
import { SupportUpdateIssueByIdService } from '@app/support/issue/application/update/support-update-issue-by-id.service';
import {
  SupportIssueAccountId,
  SupportIssueAccountUsername,
  SupportIssueAttachments,
  SupportIssueBackEnvironment,
  SupportIssueBackVersion,
  SupportIssueDescription,
  SupportIssueDisplayName,
  SupportIssueExternalColorStatus,
  SupportIssueExternalId,
  SupportIssueExternalStatus,
  SupportIssueFrontEnvironment,
  SupportIssueFrontVersion,
  SupportIssueId,
  SupportIssueMeta,
  SupportIssueScreenRecording,
  SupportIssueSubject,
} from '@app/support/issue/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(SupportUpdateIssueByIdCommand)
export class SupportUpdateIssueByIdCommandHandler
  implements ICommandHandler<SupportUpdateIssueByIdCommand>
{
  constructor(
    private readonly updateIssueByIdService: SupportUpdateIssueByIdService,
  ) {}

  async execute(command: SupportUpdateIssueByIdCommand): Promise<void> {
    // call to use case and implements ValueObjects
    await this.updateIssueByIdService.main(
      {
        id: new SupportIssueId(command.payload.id),
        externalId: new SupportIssueExternalId(command.payload.externalId),
        externalStatus: new SupportIssueExternalStatus(
          command.payload.externalStatus,
        ),
        externalColorStatus: new SupportIssueExternalColorStatus(
          command.payload.externalColorStatus,
        ),
        accountId: new SupportIssueAccountId(command.payload.accountId),
        accountUsername: new SupportIssueAccountUsername(
          command.payload.accountUsername,
        ),
        displayName: new SupportIssueDisplayName(command.payload.displayName),
        frontEnvironment: new SupportIssueFrontEnvironment(
          command.payload.frontEnvironment,
        ),
        frontVersion: new SupportIssueFrontVersion(
          command.payload.frontVersion,
        ),
        backEnvironment: new SupportIssueBackEnvironment(
          command.payload.backEnvironment,
        ),
        backVersion: new SupportIssueBackVersion(command.payload.backVersion),
        subject: new SupportIssueSubject(command.payload.subject, {
          undefinable: true,
        }),
        description: new SupportIssueDescription(command.payload.description, {
          undefinable: true,
        }),
        attachments: new SupportIssueAttachments(command.payload.attachments),
        screenRecording: new SupportIssueScreenRecording(
          command.payload.screenRecording,
        ),
        meta: new SupportIssueMeta(command.payload.meta),
      },
      command.constraint,
      command.cQMetadata,
    );
  }
}
