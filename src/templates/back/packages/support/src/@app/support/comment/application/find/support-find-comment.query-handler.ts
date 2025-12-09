import {
    SupportCommentMapper,
    SupportCommentResponse,
    SupportFindCommentQuery,
} from '@app/support/comment';
import { SupportFindCommentService } from '@app/support/comment/application/find/support-find-comment.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(SupportFindCommentQuery)
export class SupportFindCommentQueryHandler
    implements IQueryHandler<SupportFindCommentQuery>
{
    private readonly mapper: SupportCommentMapper = new SupportCommentMapper();

    constructor(
        private readonly findCommentService: SupportFindCommentService,
    ) {}

    async execute(
        query: SupportFindCommentQuery,
    ): Promise<SupportCommentResponse> {
        const comment = await this.findCommentService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(comment);
    }
}
