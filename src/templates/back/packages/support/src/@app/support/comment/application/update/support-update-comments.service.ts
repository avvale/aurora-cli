import {
    SupportAddCommentsContextEvent,
    SupportComment,
    SupportICommentRepository,
} from '@app/support/comment';
import {
    SupportCommentAccountId,
    SupportCommentAccountUsername,
    SupportCommentAttachments,
    SupportCommentDescription,
    SupportCommentDisplayName,
    SupportCommentExternalId,
    SupportCommentId,
    SupportCommentIssueId,
    SupportCommentMeta,
    SupportCommentScreenRecording,
    SupportCommentUpdatedAt,
} from '@app/support/comment/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class SupportUpdateCommentsService {
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: SupportICommentRepository,
    ) {}

    async main(
        payload: {
            id?: SupportCommentId;
            externalId?: SupportCommentExternalId;
            issueId?: SupportCommentIssueId;
            accountId?: SupportCommentAccountId;
            accountUsername?: SupportCommentAccountUsername;
            displayName?: SupportCommentDisplayName;
            description?: SupportCommentDescription;
            attachments?: SupportCommentAttachments;
            screenRecording?: SupportCommentScreenRecording;
            meta?: SupportCommentMeta;
        },
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
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
            null, // createdAt
            new SupportCommentUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );

        // update
        await this.repository.update(comment, {
            queryStatement,
            constraint,
            cQMetadata,
            updateOptions: cQMetadata?.repositoryOptions,
        });

        // get objects to delete
        const comments = await this.repository.get({
            queryStatement,
            constraint,
            cQMetadata,
        });

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const commentsRegister = this.publisher.mergeObjectContext(
            new SupportAddCommentsContextEvent(comments, cQMetadata),
        );

        commentsRegister.updated(); // apply event to model events
        commentsRegister.commit(); // commit all events of model
    }
}
