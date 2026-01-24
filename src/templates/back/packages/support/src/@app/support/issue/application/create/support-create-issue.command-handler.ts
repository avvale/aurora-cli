/* eslint-disable key-spacing */
import { SupportCreateIssueCommand } from '@app/support/issue';
import { SupportCreateIssueService } from '@app/support/issue/application/create/support-create-issue.service';
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

@CommandHandler(SupportCreateIssueCommand)
export class SupportCreateIssueCommandHandler
  implements ICommandHandler<SupportCreateIssueCommand>
{
  constructor(private readonly createIssueService: SupportCreateIssueService) {}

  async execute(command: SupportCreateIssueCommand): Promise<void> {
    // call to use case and implements ValueObjects
    await this.createIssueService.main(
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
        subject: new SupportIssueSubject(command.payload.subject),
        description: new SupportIssueDescription(command.payload.description),
        attachments: new SupportIssueAttachments(command.payload.attachments),
        screenRecording: new SupportIssueScreenRecording(
          command.payload.screenRecording,
        ),
        meta: new SupportIssueMeta(command.payload.meta),
      },
      command.cQMetadata,
    );
  }
}
