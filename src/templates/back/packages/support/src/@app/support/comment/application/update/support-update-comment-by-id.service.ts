import {
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
export class SupportUpdateCommentByIdService {
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: SupportICommentRepository,
    ) {}

    async main(
        payload: {
            id: SupportCommentId;
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

        // update by id
        await this.repository.updateById(comment, {
            constraint,
            cQMetadata,
            updateByIdOptions: cQMetadata?.repositoryOptions,
        });

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const commentRegister = this.publisher.mergeObjectContext(comment);

        commentRegister.updated({
            payload: comment,
            cQMetadata,
        }); // apply event to model events
        commentRegister.commit(); // commit all events of model
    }
}
