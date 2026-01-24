/* eslint-disable key-spacing */
import { IamAccount } from '@app/iam/account';
import {
  SupportCreatedCommentEvent,
  SupportDeletedCommentEvent,
  SupportUpdatedCommentEvent,
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
import { SupportIssue } from '@app/support/issue';
import { CQMetadata, LiteralObject } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

export class SupportComment extends AggregateRoot {
  id: SupportCommentId;
  parentId: SupportCommentParentId;
  rowId: SupportCommentRowId;
  externalId: SupportCommentExternalId;
  externalParentId: SupportCommentExternalParentId;
  issueId: SupportCommentIssueId;
  accountId: SupportCommentAccountId;
  accountUsername: SupportCommentAccountUsername;
  displayName: SupportCommentDisplayName;
  description: SupportCommentDescription;
  attachments: SupportCommentAttachments;
  screenRecording: SupportCommentScreenRecording;
  meta: SupportCommentMeta;
  createdAt: SupportCommentCreatedAt;
  updatedAt: SupportCommentUpdatedAt;
  deletedAt: SupportCommentDeletedAt;
  parent: SupportComment;
  externalParent: SupportComment;
  issue: SupportIssue;
  account: IamAccount;

  constructor(
    id: SupportCommentId,
    parentId: SupportCommentParentId,
    rowId: SupportCommentRowId,
    externalId: SupportCommentExternalId,
    externalParentId: SupportCommentExternalParentId,
    issueId: SupportCommentIssueId,
    accountId: SupportCommentAccountId,
    accountUsername: SupportCommentAccountUsername,
    displayName: SupportCommentDisplayName,
    description: SupportCommentDescription,
    attachments: SupportCommentAttachments,
    screenRecording: SupportCommentScreenRecording,
    meta: SupportCommentMeta,
    createdAt: SupportCommentCreatedAt,
    updatedAt: SupportCommentUpdatedAt,
    deletedAt: SupportCommentDeletedAt,
    parent?: SupportComment,
    externalParent?: SupportComment,
    issue?: SupportIssue,
    account?: IamAccount,
  ) {
    super();
    this.id = id;
    this.parentId = parentId;
    this.rowId = rowId;
    this.externalId = externalId;
    this.externalParentId = externalParentId;
    this.issueId = issueId;
    this.accountId = accountId;
    this.accountUsername = accountUsername;
    this.displayName = displayName;
    this.description = description;
    this.attachments = attachments;
    this.screenRecording = screenRecording;
    this.meta = meta;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
    this.parent = parent;
    this.externalParent = externalParent;
    this.issue = issue;
    this.account = account;
  }

  static register(
    id: SupportCommentId,
    parentId: SupportCommentParentId,
    rowId: SupportCommentRowId,
    externalId: SupportCommentExternalId,
    externalParentId: SupportCommentExternalParentId,
    issueId: SupportCommentIssueId,
    accountId: SupportCommentAccountId,
    accountUsername: SupportCommentAccountUsername,
    displayName: SupportCommentDisplayName,
    description: SupportCommentDescription,
    attachments: SupportCommentAttachments,
    screenRecording: SupportCommentScreenRecording,
    meta: SupportCommentMeta,
    createdAt: SupportCommentCreatedAt,
    updatedAt: SupportCommentUpdatedAt,
    deletedAt: SupportCommentDeletedAt,
    parent?: SupportComment,
    externalParent?: SupportComment,
    issue?: SupportIssue,
    account?: IamAccount,
  ): SupportComment {
    return new SupportComment(
      id,
      parentId,
      rowId,
      externalId,
      externalParentId,
      issueId,
      accountId,
      accountUsername,
      displayName,
      description,
      attachments,
      screenRecording,
      meta,
      createdAt,
      updatedAt,
      deletedAt,
      parent,
      externalParent,
      issue,
      account,
    );
  }

  created(event: { payload: SupportComment; cQMetadata?: CQMetadata }): void {
    this.apply(
      new SupportCreatedCommentEvent({
        payload: {
          id: event.payload.id.value,
          parentId: event.payload.parentId?.value,
          externalId: event.payload.externalId?.value,
          externalParentId: event.payload.externalParentId?.value,
          issueId: event.payload.issueId?.value,
          accountId: event.payload.accountId?.value,
          accountUsername: event.payload.accountUsername?.value,
          displayName: event.payload.displayName?.value,
          description: event.payload.description.value,
          attachments: event.payload.attachments?.value,
          screenRecording: event.payload.screenRecording?.value,
          meta: event.payload.meta?.value,
          createdAt: event.payload.createdAt?.value,
          updatedAt: event.payload.updatedAt?.value,
          deletedAt: event.payload.deletedAt?.value,
        },
        cQMetadata: event.cQMetadata,
      }),
    );
  }

  updated(event: { payload: SupportComment; cQMetadata?: CQMetadata }): void {
    this.apply(
      new SupportUpdatedCommentEvent({
        payload: {
          id: event.payload.id?.value,
          parentId: event.payload.parentId?.value,
          externalId: event.payload.externalId?.value,
          externalParentId: event.payload.externalParentId?.value,
          issueId: event.payload.issueId?.value,
          accountId: event.payload.accountId?.value,
          accountUsername: event.payload.accountUsername?.value,
          displayName: event.payload.displayName?.value,
          description: event.payload.description?.value,
          attachments: event.payload.attachments?.value,
          screenRecording: event.payload.screenRecording?.value,
          meta: event.payload.meta?.value,
          createdAt: event.payload.createdAt?.value,
          updatedAt: event.payload.updatedAt?.value,
          deletedAt: event.payload.deletedAt?.value,
        },
        cQMetadata: event.cQMetadata,
      }),
    );
  }

  deleted(event: { payload: SupportComment; cQMetadata?: CQMetadata }): void {
    this.apply(
      new SupportDeletedCommentEvent({
        payload: {
          id: event.payload.id.value,
          parentId: event.payload.parentId?.value,
          rowId: event.payload.rowId.value,
          externalId: event.payload.externalId?.value,
          externalParentId: event.payload.externalParentId?.value,
          issueId: event.payload.issueId?.value,
          accountId: event.payload.accountId?.value,
          accountUsername: event.payload.accountUsername?.value,
          displayName: event.payload.displayName?.value,
          description: event.payload.description.value,
          attachments: event.payload.attachments?.value,
          screenRecording: event.payload.screenRecording?.value,
          meta: event.payload.meta?.value,
          createdAt: event.payload.createdAt?.value,
          updatedAt: event.payload.updatedAt?.value,
          deletedAt: event.payload.deletedAt?.value,
        },
        cQMetadata: event.cQMetadata,
      }),
    );
  }

  toDTO(): LiteralObject {
    return {
      id: this.id.value,
      parentId: this.parentId?.value,
      rowId: this.rowId.value,
      externalId: this.externalId?.value,
      externalParentId: this.externalParentId?.value,
      issueId: this.issueId?.value,
      accountId: this.accountId?.value,
      accountUsername: this.accountUsername?.value,
      displayName: this.displayName?.value,
      description: this.description.value,
      attachments: this.attachments?.value,
      screenRecording: this.screenRecording?.value,
      meta: this.meta?.value,
      createdAt: this.createdAt?.value,
      updatedAt: this.updatedAt?.value,
      deletedAt: this.deletedAt?.value,
      parent: this.parent?.toDTO(),
      externalParent: this.externalParent?.toDTO(),
      issue: this.issue?.toDTO(),
      account: this.account?.toDTO(),
    };
  }

  // function called to get data for repository side effect methods
  toRepository(): LiteralObject {
    return {
      id: this.id.value,
      parentId: this.parentId?.value,
      externalId: this.externalId?.value,
      externalParentId: this.externalParentId?.value,
      issueId: this.issueId?.value,
      accountId: this.accountId?.value,
      accountUsername: this.accountUsername?.value,
      displayName: this.displayName?.value,
      description: this.description.value,
      attachments: this.attachments?.value,
      screenRecording: this.screenRecording?.value,
      meta: this.meta?.value,
      createdAt: this.createdAt?.value,
      updatedAt: this.updatedAt?.value,
      deletedAt: this.deletedAt?.value,
      parent: this.parent?.toDTO(),
      externalParent: this.externalParent?.toDTO(),
      issue: this.issue?.toDTO(),
      account: this.account?.toDTO(),
    };
  }
}
