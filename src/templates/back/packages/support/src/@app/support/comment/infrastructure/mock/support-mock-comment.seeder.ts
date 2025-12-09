import { SupportComment, supportMockCommentData } from '@app/support/comment';
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
import { MockSeeder } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';

@Injectable()
export class SupportMockCommentSeeder extends MockSeeder<SupportComment> {
    public collectionSource: SupportComment[];

    constructor() {
        super();
        this._createMock();
    }

    private _createMock(): void {
        this.collectionSource = [];

        for (const comment of _.orderBy(supportMockCommentData, ['id'])) {
            this.collectionSource.push(
                SupportComment.register(
                    new SupportCommentId(comment.id),
                    new SupportCommentRowId(comment.rowId),
                    new SupportCommentExternalId(comment.externalId),
                    new SupportCommentIssueId(comment.issueId),
                    new SupportCommentAccountId(comment.accountId),
                    new SupportCommentAccountUsername(comment.accountUsername),
                    new SupportCommentDisplayName(comment.displayName),
                    new SupportCommentDescription(comment.description),
                    new SupportCommentAttachments(comment.attachments),
                    new SupportCommentScreenRecording(comment.screenRecording),
                    new SupportCommentMeta(comment.meta),
                    new SupportCommentCreatedAt({ currentTimestamp: true }),
                    new SupportCommentUpdatedAt({ currentTimestamp: true }),
                    new SupportCommentDeletedAt(null),
                ),
            );
        }
    }
}
