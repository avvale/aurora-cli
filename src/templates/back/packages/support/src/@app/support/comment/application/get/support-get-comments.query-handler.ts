import {
    SupportComment,
    SupportCommentMapper,
    SupportCommentResponse,
    SupportGetCommentsQuery,
} from '@app/support/comment';
import { SupportGetCommentsService } from '@app/support/comment/application/get/support-get-comments.service';
import { LiteralObject } from '@aurorajs.dev/core';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(SupportGetCommentsQuery)
export class SupportGetCommentsQueryHandler
    implements IQueryHandler<SupportGetCommentsQuery>
{
    private readonly mapper: SupportCommentMapper = new SupportCommentMapper();

    constructor(
        private readonly getCommentsService: SupportGetCommentsService,
    ) {}

    async execute(
        query: SupportGetCommentsQuery,
    ): Promise<SupportCommentResponse[] | LiteralObject[]> {
        const models = await this.getCommentsService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        if (query.cQMetadata?.excludeMapModelToAggregate) return models;

        return this.mapper.mapAggregatesToResponses(models as SupportComment[]);
    }
}
