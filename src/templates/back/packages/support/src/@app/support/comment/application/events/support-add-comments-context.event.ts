import {
  SupportComment,
  SupportCreatedCommentEvent,
  SupportCreatedCommentsEvent,
  SupportDeletedCommentEvent,
  SupportDeletedCommentsEvent,
  SupportUpdatedCommentEvent,
  SupportUpdatedCommentsEvent,
} from '@app/support/comment';
import { CQMetadata } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

export class SupportAddCommentsContextEvent extends AggregateRoot {
  constructor(
    public readonly aggregateRoots: SupportComment[] = [],
    public readonly cQMetadata?: CQMetadata,
  ) {
    super();
  }

  *[Symbol.iterator]() {
    for (const aggregateRoot of this.aggregateRoots) yield aggregateRoot;
  }

  created(): void {
    this.apply(
      new SupportCreatedCommentsEvent({
        payload: this.aggregateRoots.map(
          (comment) =>
            new SupportCreatedCommentEvent({
              payload: {
                id: comment.id.value,
                parentId: comment.parentId?.value,
                externalId: comment.externalId?.value,
                externalParentId: comment.externalParentId?.value,
                issueId: comment.issueId?.value,
                accountId: comment.accountId?.value,
                accountUsername: comment.accountUsername?.value,
                displayName: comment.displayName?.value,
                description: comment.description.value,
                attachments: comment.attachments?.value,
                screenRecording: comment.screenRecording?.value,
                meta: comment.meta?.value,
                createdAt: comment.createdAt?.value,
                updatedAt: comment.updatedAt?.value,
                deletedAt: comment.deletedAt?.value,
              },
            }),
        ),
        cQMetadata: this.cQMetadata,
      }),
    );
  }

  updated(): void {
    this.apply(
      new SupportUpdatedCommentsEvent({
        payload: this.aggregateRoots.map(
          (comment) =>
            new SupportUpdatedCommentEvent({
              payload: {
                id: comment.id.value,
                parentId: comment.parentId?.value,
                externalId: comment.externalId?.value,
                externalParentId: comment.externalParentId?.value,
                issueId: comment.issueId?.value,
                accountId: comment.accountId?.value,
                accountUsername: comment.accountUsername?.value,
                displayName: comment.displayName?.value,
                description: comment.description.value,
                attachments: comment.attachments?.value,
                screenRecording: comment.screenRecording?.value,
                meta: comment.meta?.value,
                createdAt: comment.createdAt?.value,
                updatedAt: comment.updatedAt?.value,
                deletedAt: comment.deletedAt?.value,
              },
            }),
        ),
        cQMetadata: this.cQMetadata,
      }),
    );
  }

  deleted(): void {
    this.apply(
      new SupportDeletedCommentsEvent({
        payload: this.aggregateRoots.map(
          (comment) =>
            new SupportDeletedCommentEvent({
              payload: {
                id: comment.id.value,
                parentId: comment.parentId?.value,
                rowId: comment.rowId.value,
                externalId: comment.externalId?.value,
                externalParentId: comment.externalParentId?.value,
                issueId: comment.issueId?.value,
                accountId: comment.accountId?.value,
                accountUsername: comment.accountUsername?.value,
                displayName: comment.displayName?.value,
                description: comment.description.value,
                attachments: comment.attachments?.value,
                screenRecording: comment.screenRecording?.value,
                meta: comment.meta?.value,
                createdAt: comment.createdAt?.value,
                updatedAt: comment.updatedAt?.value,
                deletedAt: comment.deletedAt?.value,
              },
            }),
        ),
        cQMetadata: this.cQMetadata,
      }),
    );
  }
}
