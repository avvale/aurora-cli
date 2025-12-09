import {
    SupportCommentMapper,
    SupportCommentResponse,
    SupportFindCommentByIdQuery,
} from '@app/support/comment';
import { SupportFindCommentByIdService } from '@app/support/comment/application/find/support-find-comment-by-id.service';
import { SupportCommentId } from '@app/support/comment/domain/value-objects';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(SupportFindCommentByIdQuery)
export class SupportFindCommentByIdQueryHandler
    implements IQueryHandler<SupportFindCommentByIdQuery>
{
    private readonly mapper: SupportCommentMapper = new SupportCommentMapper();

    constructor(
        private readonly findCommentByIdService: SupportFindCommentByIdService,
    ) {}

    async execute(
        query: SupportFindCommentByIdQuery,
    ): Promise<SupportCommentResponse> {
        const comment = await this.findCommentByIdService.main(
            new SupportCommentId(query.id),
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(comment);
    }
}
