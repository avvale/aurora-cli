import { SupportIssue, supportMockIssueData } from '@app/support/issue';
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
import { MockSeeder } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';

@Injectable()
export class SupportMockIssueSeeder extends MockSeeder<SupportIssue> {
    public collectionSource: SupportIssue[];

    constructor() {
        super();
        this._createMock();
    }

    private _createMock(): void {
        this.collectionSource = [];

        for (const issue of _.orderBy(supportMockIssueData, ['id'])) {
            this.collectionSource.push(
                SupportIssue.register(
                    new SupportIssueId(issue.id),
                    new SupportIssueRowId(issue.rowId),
                    new SupportIssueExternalId(issue.externalId),
                    new SupportIssueExternalStatus(issue.externalStatus),
                    new SupportIssueExternalColorStatus(
                        issue.externalColorStatus,
                    ),
                    new SupportIssueAccountId(issue.accountId),
                    new SupportIssueAccountUsername(issue.accountUsername),
                    new SupportIssueDisplayName(issue.displayName),
                    new SupportIssueFrontEnvironment(issue.frontEnvironment),
                    new SupportIssueFrontVersion(issue.frontVersion),
                    new SupportIssueBackEnvironment(issue.backEnvironment),
                    new SupportIssueBackVersion(issue.backVersion),
                    new SupportIssueSubject(issue.subject),
                    new SupportIssueDescription(issue.description),
                    new SupportIssueAttachments(issue.attachments),
                    new SupportIssueScreenRecording(issue.screenRecording),
                    new SupportIssueMeta(issue.meta),
                    new SupportIssueCreatedAt({ currentTimestamp: true }),
                    new SupportIssueUpdatedAt({ currentTimestamp: true }),
                    new SupportIssueDeletedAt(null),
                ),
            );
        }
    }
}
