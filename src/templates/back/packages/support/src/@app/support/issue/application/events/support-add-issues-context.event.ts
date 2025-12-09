import {
    SupportCreatedIssueEvent,
    SupportCreatedIssuesEvent,
    SupportIssue,
    SupportUpdatedIssueEvent,
    SupportUpdatedIssuesEvent,
} from '@app/support/issue';
import { CQMetadata } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

export class SupportAddIssuesContextEvent extends AggregateRoot {
    constructor(
        public readonly aggregateRoots: SupportIssue[] = [],
        public readonly cQMetadata?: CQMetadata,
    ) {
        super();
    }

    *[Symbol.iterator]() {
        for (const aggregateRoot of this.aggregateRoots) yield aggregateRoot;
    }

    created(): void {
        this.apply(
            new SupportCreatedIssuesEvent({
                payload: this.aggregateRoots.map(
                    (issue) =>
                        new SupportCreatedIssueEvent({
                            payload: {
                                id: issue.id.value,
                                externalId: issue.externalId?.value,
                                externalStatus: issue.externalStatus?.value,
                                externalColorStatus:
                                    issue.externalColorStatus?.value,
                                accountId: issue.accountId?.value,
                                accountUsername: issue.accountUsername?.value,
                                displayName: issue.displayName?.value,
                                frontEnvironment: issue.frontEnvironment?.value,
                                frontVersion: issue.frontVersion?.value,
                                backEnvironment: issue.backEnvironment?.value,
                                backVersion: issue.backVersion?.value,
                                subject: issue.subject.value,
                                description: issue.description.value,
                                attachments: issue.attachments?.value,
                                screenRecording: issue.screenRecording?.value,
                                meta: issue.meta?.value,
                                createdAt: issue.createdAt?.value,
                                updatedAt: issue.updatedAt?.value,
                                deletedAt: issue.deletedAt?.value,
                            },
                        }),
                ),
                cQMetadata: this.cQMetadata,
            }),
        );
    }

    updated(): void {
        this.apply(
            new SupportUpdatedIssuesEvent({
                payload: this.aggregateRoots.map(
                    (issue) =>
                        new SupportUpdatedIssueEvent({
                            payload: {
                                id: issue.id.value,
                                externalId: issue.externalId?.value,
                                externalStatus: issue.externalStatus?.value,
                                externalColorStatus:
                                    issue.externalColorStatus?.value,
                                accountId: issue.accountId?.value,
                                accountUsername: issue.accountUsername?.value,
                                displayName: issue.displayName?.value,
                                frontEnvironment: issue.frontEnvironment?.value,
                                frontVersion: issue.frontVersion?.value,
                                backEnvironment: issue.backEnvironment?.value,
                                backVersion: issue.backVersion?.value,
                                subject: issue.subject.value,
                                description: issue.description.value,
                                attachments: issue.attachments?.value,
                                screenRecording: issue.screenRecording?.value,
                                meta: issue.meta?.value,
                                createdAt: issue.createdAt?.value,
                                updatedAt: issue.updatedAt?.value,
                                deletedAt: issue.deletedAt?.value,
                            },
                        }),
                ),
                cQMetadata: this.cQMetadata,
            }),
        );
    }
}
