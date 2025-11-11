import { IamFindTagQuery, IamTagMapper, IamTagResponse } from '@app/iam/tag';
import { IamFindTagService } from '@app/iam/tag/application/find/iam-find-tag.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(IamFindTagQuery)
export class IamFindTagQueryHandler implements IQueryHandler<IamFindTagQuery> {
    private readonly mapper: IamTagMapper = new IamTagMapper();

    constructor(private readonly findTagService: IamFindTagService) {}

    async execute(query: IamFindTagQuery): Promise<IamTagResponse> {
        const tag = await this.findTagService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(tag);
    }
}
