import { SupportIIssueRepository, SupportIssue } from '@app/support/issue';
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
export class SupportUpdateIssueByIdService {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: SupportIIssueRepository,
  ) {}

  async main(
    payload: {
      id: SupportIssueId;
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

    // update by id
    await this.repository.updateById(issue, {
      constraint,
      cQMetadata,
      updateByIdOptions: cQMetadata?.repositoryOptions,
    });

    // merge EventBus methods with object returned by the repository, to be able to apply and commit events
    const issueRegister = this.publisher.mergeObjectContext(issue);

    issueRegister.updated({
      payload: issue,
      cQMetadata,
    }); // apply event to model events
    issueRegister.commit(); // commit all events of model
  }
}
