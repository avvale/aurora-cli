import { IamAccountMapper } from '@app/iam/account';
import {
  storageAccountApplySharedAccessSignatureFunction,
  StorageAccountSharedAccessSignatureService,
} from '@app/storage-account/shared-access-signature';
import { SupportCommentMapper } from '@app/support/comment';
import { SupportIssue, SupportIssueResponse } from '@app/support/issue';
import {
  SupportIssueAccountId,
  SupportIssueAccountUsername,
  SupportIssueAttachments,
  SupportIssueBackEnvironment,
  SupportIssueBackVersion,
  SupportIssueCreatedAt,
  SupportIssueDeletedAt,
  SupportIssueDescription,
  SupportIssueDisplayName,
  SupportIssueExternalColorStatus,
  SupportIssueExternalId,
  SupportIssueExternalStatus,
  SupportIssueFrontEnvironment,
  SupportIssueFrontVersion,
  SupportIssueId,
  SupportIssueMeta,
  SupportIssueRowId,
  SupportIssueScreenRecording,
  SupportIssueSubject,
  SupportIssueUpdatedAt,
} from '@app/support/issue/domain/value-objects';
import {
  CQMetadata,
  IMapper,
  LiteralObject,
  MapperOptions,
} from '@aurorajs.dev/core';

export class SupportIssueMapper implements IMapper {
  constructor(public options: MapperOptions = { eagerLoading: true }) {}

  /**
   * Map object to aggregate
   * @param issue
   */
  mapModelToAggregate(
    issue: LiteralObject,
    cQMetadata?: CQMetadata,
  ): SupportIssue {
    if (!issue) return;

    return this.makeAggregate(issue, cQMetadata);
  }

  /**
   * Map array of objects to array aggregates
   * @param issues
   */
  mapModelsToAggregates(
    issues: LiteralObject[],
    cQMetadata?: CQMetadata,
  ): SupportIssue[] {
    if (!Array.isArray(issues)) return;

    return issues.map((issue) => this.makeAggregate(issue, cQMetadata));
  }

  /**
   * Map aggregate to response
   * @param issue
   */
  mapAggregateToResponse(
    issue: SupportIssue,
    storageAccountSharedAccessSignatureService?: StorageAccountSharedAccessSignatureService,
  ): SupportIssueResponse {
    return this.makeResponse(issue, storageAccountSharedAccessSignatureService);
  }

  /**
   * Map array of aggregates to array responses
   * @param issues
   */
  mapAggregatesToResponses(
    issues: SupportIssue[],
    storageAccountSharedAccessSignatureService?: StorageAccountSharedAccessSignatureService,
  ): SupportIssueResponse[] {
    if (!Array.isArray(issues)) return;

    return issues.map((issue) =>
      this.makeResponse(issue, storageAccountSharedAccessSignatureService),
    );
  }

  private makeAggregate(
    issue: LiteralObject,
    cQMetadata?: CQMetadata,
  ): SupportIssue {
    return SupportIssue.register(
      new SupportIssueId(issue.id, { undefinable: true }),
      new SupportIssueRowId(issue.rowId, { undefinable: true }),
      new SupportIssueExternalId(issue.externalId, { undefinable: true }),
      new SupportIssueExternalStatus(issue.externalStatus, {
        undefinable: true,
      }),
      new SupportIssueExternalColorStatus(issue.externalColorStatus, {
        undefinable: true,
      }),
      new SupportIssueAccountId(issue.accountId, { undefinable: true }),
      new SupportIssueAccountUsername(issue.accountUsername, {
        undefinable: true,
      }),
      new SupportIssueDisplayName(issue.displayName, {
        undefinable: true,
      }),
      new SupportIssueFrontEnvironment(issue.frontEnvironment, {
        undefinable: true,
      }),
      new SupportIssueFrontVersion(issue.frontVersion, {
        undefinable: true,
      }),
      new SupportIssueBackEnvironment(issue.backEnvironment, {
        undefinable: true,
      }),
      new SupportIssueBackVersion(issue.backVersion, {
        undefinable: true,
      }),
      new SupportIssueSubject(issue.subject, { undefinable: true }),
      new SupportIssueDescription(issue.description, {
        undefinable: true,
      }),
      new SupportIssueAttachments(issue.attachments, {
        undefinable: true,
      }),
      new SupportIssueScreenRecording(issue.screenRecording, {
        undefinable: true,
      }),
      new SupportIssueMeta(issue.meta, { undefinable: true }),
      new SupportIssueCreatedAt(
        issue.createdAt,
        { undefinable: true },
        { addTimezone: cQMetadata?.timezone },
      ),
      new SupportIssueUpdatedAt(
        issue.updatedAt,
        { undefinable: true },
        { addTimezone: cQMetadata?.timezone },
      ),
      new SupportIssueDeletedAt(
        issue.deletedAt,
        { undefinable: true },
        { addTimezone: cQMetadata?.timezone },
      ),
      this.options.eagerLoading
        ? new IamAccountMapper({
            eagerLoading: true,
          }).mapModelToAggregate(issue.account, cQMetadata)
        : undefined,
      this.options.eagerLoading
        ? new SupportCommentMapper({
            eagerLoading: true,
          }).mapModelsToAggregates(issue.comments, cQMetadata)
        : undefined,
    );
  }

  private makeResponse(
    issue: SupportIssue,
    storageAccountSharedAccessSignatureService?: StorageAccountSharedAccessSignatureService,
  ): SupportIssueResponse {
    if (!issue) return null;

    const screenRecording = storageAccountApplySharedAccessSignatureFunction(
      issue.screenRecording.value?.url,
      storageAccountSharedAccessSignatureService,
      {
        wrapperObject: issue.screenRecording.value,
      },
    );

    return new SupportIssueResponse(
      issue.id.value,
      issue.rowId.value,
      issue.externalId.value,
      issue.externalStatus.value,
      issue.externalColorStatus.value,
      issue.accountId.value,
      issue.accountUsername.value,
      issue.displayName.value,
      issue.frontEnvironment.value,
      issue.frontVersion.value,
      issue.backEnvironment.value,
      issue.backVersion.value,
      issue.subject.value,
      issue.description.value,
      issue.attachments.value,
      screenRecording,
      issue.meta.value,
      issue.createdAt.value,
      issue.updatedAt.value,
      issue.deletedAt.value,
      this.options.eagerLoading
        ? new IamAccountMapper({
            eagerLoading: true,
          }).mapAggregateToResponse(issue.account)
        : undefined,
      this.options.eagerLoading
        ? new SupportCommentMapper({
            eagerLoading: true,
          }).mapAggregatesToResponses(issue.comments)
        : undefined,
    );
  }
}
