import {
  SupportComment,
  SupportICommentRepository,
  supportMockCommentData,
} from '@app/support/comment';
import {
  SupportCommentAccountId,
  SupportCommentAccountUsername,
  SupportCommentAttachments,
  SupportCommentCreatedAt,
  SupportCommentDeletedAt,
  SupportCommentDescription,
  SupportCommentDisplayName,
  SupportCommentExternalId,
  SupportCommentExternalParentId,
  SupportCommentId,
  SupportCommentIssueId,
  SupportCommentMeta,
  SupportCommentParentId,
  SupportCommentRowId,
  SupportCommentScreenRecording,
  SupportCommentUpdatedAt,
} from '@app/support/comment/domain/value-objects';
import { MockRepository, Utils } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SupportMockCommentRepository
  extends MockRepository<SupportComment>
  implements SupportICommentRepository
{
  public readonly repository: any;
  public readonly aggregateName: string = 'SupportComment';
  public collectionSource: SupportComment[];

  constructor() {
    super();
    this.createSourceMockData();
  }

  public reset(): void {
    this.createSourceMockData();
  }

  private createSourceMockData(): void {
    this.collectionSource = [];
    const now = Utils.nowTimestamp();

    for (const itemCollection of <any[]>supportMockCommentData) {
      itemCollection['createdAt'] = now;
      itemCollection['updatedAt'] = now;
      itemCollection['deletedAt'] = null;

      this.collectionSource.push(
        SupportComment.register(
          new SupportCommentId(itemCollection.id),
          new SupportCommentParentId(itemCollection.parentId),
          new SupportCommentRowId(itemCollection.rowId),
          new SupportCommentExternalId(itemCollection.externalId),
          new SupportCommentExternalParentId(itemCollection.externalParentId),
          new SupportCommentIssueId(itemCollection.issueId),
          new SupportCommentAccountId(itemCollection.accountId),
          new SupportCommentAccountUsername(itemCollection.accountUsername),
          new SupportCommentDisplayName(itemCollection.displayName),
          new SupportCommentDescription(itemCollection.description),
          new SupportCommentAttachments(itemCollection.attachments),
          new SupportCommentScreenRecording(itemCollection.screenRecording),
          new SupportCommentMeta(itemCollection.meta),
          new SupportCommentCreatedAt(itemCollection.createdAt),
          new SupportCommentUpdatedAt(itemCollection.updatedAt),
          new SupportCommentDeletedAt(itemCollection.deletedAt),
        ),
      );
    }
  }
}
