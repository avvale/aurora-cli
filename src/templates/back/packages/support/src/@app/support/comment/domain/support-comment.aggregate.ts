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
    SupportCommentId,
    SupportCommentIssueId,
    SupportCommentMeta,
    SupportCommentRowId,
    SupportCommentScreenRecording,
    SupportCommentUpdatedAt,
} from '@app/support/comment/domain/value-objects';
import { SupportIssue } from '@app/support/issue';
import { CQMetadata, LiteralObject } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

export class SupportComment extends AggregateRoot {
    id: SupportCommentId;
    rowId: SupportCommentRowId;
    externalId: SupportCommentExternalId;
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
    issue: SupportIssue;
    account: IamAccount;

    constructor(
        id: SupportCommentId,
        rowId: SupportCommentRowId,
        externalId: SupportCommentExternalId,
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
        issue?: SupportIssue,
        account?: IamAccount,
    ) {
        super();
        this.id = id;
        this.rowId = rowId;
        this.externalId = externalId;
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
        this.issue = issue;
        this.account = account;
    }

    static register(
        id: SupportCommentId,
        rowId: SupportCommentRowId,
        externalId: SupportCommentExternalId,
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
        issue?: SupportIssue,
        account?: IamAccount,
    ): SupportComment {
        return new SupportComment(
            id,
            rowId,
            externalId,
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
            issue,
            account,
        );
    }

    created(event: { payload: SupportComment; cQMetadata?: CQMetadata }): void {
        this.apply(
            new SupportCreatedCommentEvent({
                payload: {
                    id: event.payload.id.value,
                    externalId: event.payload.externalId?.value,
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
                    externalId: event.payload.externalId?.value,
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
                    rowId: event.payload.rowId.value,
                    externalId: event.payload.externalId?.value,
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
            rowId: this.rowId.value,
            externalId: this.externalId?.value,
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
            issue: this.issue?.toDTO(),
            account: this.account?.toDTO(),
        };
    }

    // function called to get data for repository side effect methods
    toRepository(): LiteralObject {
        return {
            id: this.id.value,
            externalId: this.externalId?.value,
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
            issue: this.issue?.toDTO(),
            account: this.account?.toDTO(),
        };
    }
}
