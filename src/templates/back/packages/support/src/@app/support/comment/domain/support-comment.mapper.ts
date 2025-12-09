import { IamAccountMapper } from '@app/iam/account';
import { SupportComment, SupportCommentResponse } from '@app/support/comment';
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
import { SupportIssueMapper } from '@app/support/issue';
import {
    CQMetadata,
    IMapper,
    LiteralObject,
    MapperOptions,
} from '@aurorajs.dev/core';

export class SupportCommentMapper implements IMapper {
    constructor(public options: MapperOptions = { eagerLoading: true }) {}

    /**
     * Map object to aggregate
     * @param comment
     */
    mapModelToAggregate(
        comment: LiteralObject,
        cQMetadata?: CQMetadata,
    ): SupportComment {
        if (!comment) return;

        return this.makeAggregate(comment, cQMetadata);
    }

    /**
     * Map array of objects to array aggregates
     * @param comments
     */
    mapModelsToAggregates(
        comments: LiteralObject[],
        cQMetadata?: CQMetadata,
    ): SupportComment[] {
        if (!Array.isArray(comments)) return;

        return comments.map((comment) =>
            this.makeAggregate(comment, cQMetadata),
        );
    }

    /**
     * Map aggregate to response
     * @param comment
     */
    mapAggregateToResponse(comment: SupportComment): SupportCommentResponse {
        return this.makeResponse(comment);
    }

    /**
     * Map array of aggregates to array responses
     * @param comments
     */
    mapAggregatesToResponses(
        comments: SupportComment[],
    ): SupportCommentResponse[] {
        if (!Array.isArray(comments)) return;

        return comments.map((comment) => this.makeResponse(comment));
    }

    private makeAggregate(
        comment: LiteralObject,
        cQMetadata?: CQMetadata,
    ): SupportComment {
        return SupportComment.register(
            new SupportCommentId(comment.id, { undefinable: true }),
            new SupportCommentRowId(comment.rowId, { undefinable: true }),
            new SupportCommentExternalId(comment.externalId, {
                undefinable: true,
            }),
            new SupportCommentIssueId(comment.issueId, { undefinable: true }),
            new SupportCommentAccountId(comment.accountId, {
                undefinable: true,
            }),
            new SupportCommentAccountUsername(comment.accountUsername, {
                undefinable: true,
            }),
            new SupportCommentDisplayName(comment.displayName, {
                undefinable: true,
            }),
            new SupportCommentDescription(comment.description, {
                undefinable: true,
            }),
            new SupportCommentAttachments(comment.attachments, {
                undefinable: true,
            }),
            new SupportCommentScreenRecording(comment.screenRecording, {
                undefinable: true,
            }),
            new SupportCommentMeta(comment.meta, { undefinable: true }),
            new SupportCommentCreatedAt(
                comment.createdAt,
                { undefinable: true },
                { addTimezone: cQMetadata?.timezone },
            ),
            new SupportCommentUpdatedAt(
                comment.updatedAt,
                { undefinable: true },
                { addTimezone: cQMetadata?.timezone },
            ),
            new SupportCommentDeletedAt(
                comment.deletedAt,
                { undefinable: true },
                { addTimezone: cQMetadata?.timezone },
            ),
            this.options.eagerLoading
                ? new SupportIssueMapper({
                      eagerLoading: true,
                  }).mapModelToAggregate(comment.issue, cQMetadata)
                : undefined,
            this.options.eagerLoading
                ? new IamAccountMapper({
                      eagerLoading: true,
                  }).mapModelToAggregate(comment.account, cQMetadata)
                : undefined,
        );
    }

    private makeResponse(comment: SupportComment): SupportCommentResponse {
        if (!comment) return;

        return new SupportCommentResponse(
            comment.id.value,
            comment.rowId.value,
            comment.externalId.value,
            comment.issueId.value,
            comment.accountId.value,
            comment.accountUsername.value,
            comment.displayName.value,
            comment.description.value,
            comment.attachments.value,
            comment.screenRecording.value,
            comment.meta.value,
            comment.createdAt.value,
            comment.updatedAt.value,
            comment.deletedAt.value,
            this.options.eagerLoading
                ? new SupportIssueMapper({
                      eagerLoading: true,
                  }).mapAggregateToResponse(comment.issue)
                : undefined,
            this.options.eagerLoading
                ? new IamAccountMapper({
                      eagerLoading: true,
                  }).mapAggregateToResponse(comment.account)
                : undefined,
        );
    }
}
