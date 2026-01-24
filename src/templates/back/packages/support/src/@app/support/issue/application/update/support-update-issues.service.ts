import {
  SupportAddIssuesContextEvent,
  SupportIIssueRepository,
  SupportIssue,
} from '@app/support/issue';
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
  SupportIssueUpdatedAt,
} from '@app/support/issue/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class SupportUpdateIssuesService {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: SupportIIssueRepository,
  ) {}

  async main(
    payload: {
      id?: SupportIssueId;
      externalId?: SupportIssueExternalId;
      externalStatus?: SupportIssueExternalStatus;
      externalColorStatus?: SupportIssueExternalColorStatus;
      accountId?: SupportIssueAccountId;
      accountUsername?: SupportIssueAccountUsername;
      displayName?: SupportIssueDisplayName;
      frontEnvironment?: SupportIssueFrontEnvironment;
      frontVersion?: SupportIssueFrontVersion;
      backEnvironment?: SupportIssueBackEnvironment;
      backVersion?: SupportIssueBackVersion;
      subject?: SupportIssueSubject;
      description?: SupportIssueDescription;
      attachments?: SupportIssueAttachments;
      screenRecording?: SupportIssueScreenRecording;
      meta?: SupportIssueMeta;
    },
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    cQMetadata?: CQMetadata,
  ): Promise<void> {
    // create aggregate with factory pattern
    const issue = SupportIssue.register(
      payload.id,
      undefined, // rowId
      payload.externalId,
      payload.externalStatus,
      payload.externalColorStatus,
      payload.accountId,
      payload.accountUsername,
      payload.displayName,
      payload.frontEnvironment,
      payload.frontVersion,
      payload.backEnvironment,
      payload.backVersion,
      payload.subject,
      payload.description,
      payload.attachments,
      payload.screenRecording,
      payload.meta,
      null, // createdAt
      new SupportIssueUpdatedAt({ currentTimestamp: true }),
      null, // deletedAt
    );

    // update
    await this.repository.update(issue, {
      queryStatement,
      constraint,
      cQMetadata,
      updateOptions: cQMetadata?.repositoryOptions,
    });

    // get objects to delete
    const issues = await this.repository.get({
      queryStatement,
      constraint,
      cQMetadata,
    });

    // merge EventBus methods with object returned by the repository, to be able to apply and commit events
    const issuesRegister = this.publisher.mergeObjectContext(
      new SupportAddIssuesContextEvent(issues, cQMetadata),
    );

    issuesRegister.updated(); // apply event to model events
    issuesRegister.commit(); // commit all events of model
  }
}
