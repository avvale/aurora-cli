import {
    SupportComment,
    SupportICommentRepository,
} from '@app/support/comment';
import {
    SupportCommentAccountId,
    SupportCommentAccountUsername,
    SupportCommentAttachments,
    SupportCommentCreatedAt,
    SupportCommentDescription,
    SupportCommentDisplayName,
    SupportCommentExternalId,
    SupportCommentId,
    SupportCommentIssueId,
    SupportCommentMeta,
    SupportCommentScreenRecording,
    SupportCommentUpdatedAt,
} from '@app/support/comment/domain/value-objects';
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class SupportCreateCommentService {
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: SupportICommentRepository,
    ) {}

    async main(
        payload: {
            id: SupportCommentId;
            externalId: SupportCommentExternalId;
            issueId: SupportCommentIssueId;
            accountId: SupportCommentAccountId;
            accountUsername: SupportCommentAccountUsername;
            displayName: SupportCommentDisplayName;
            description: SupportCommentDescription;
            attachments: SupportCommentAttachments;
            screenRecording: SupportCommentScreenRecording;
            meta: SupportCommentMeta;
        },
        cQMetadata?: CQMetadata,
    ): Promise<void> {
        // create aggregate with factory pattern
        const comment = SupportComment.register(
            payload.id,
            undefined, // rowId
            payload.externalId,
            payload.issueId,
            payload.accountId,
            payload.accountUsername,
            payload.displayName,
            payload.description,
            payload.attachments,
            payload.screenRecording,
            payload.meta,
            new SupportCommentCreatedAt({ currentTimestamp: true }),
            new SupportCommentUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );

        await this.repository.create(comment, {
            createOptions: cQMetadata?.repositoryOptions,
        });

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const commentRegister = this.publisher.mergeObjectContext(comment);

        commentRegister.created({
            payload: comment,
            cQMetadata,
        }); // apply event to model events
        commentRegister.commit(); // commit all events of model
    }
}
