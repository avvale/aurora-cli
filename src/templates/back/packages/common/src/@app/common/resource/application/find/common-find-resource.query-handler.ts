import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CommonResourceResponse } from '../../domain/common-resource.response';
import { CommonResourceMapper } from '../../domain/common-resource.mapper';
import { CommonFindResourceQuery } from './common-find-resource.query';
import { CommonFindResourceService } from './common-find-resource.service';

@QueryHandler(CommonFindResourceQuery)
export class CommonFindResourceQueryHandler implements IQueryHandler<CommonFindResourceQuery>
{
    private readonly mapper: CommonResourceMapper = new CommonResourceMapper();

    constructor(
        private readonly findResourceService: CommonFindResourceService,
    ) {}

    async execute(query: CommonFindResourceQuery): Promise<CommonResourceResponse>
    {
        const resource = await this.findResourceService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(resource);
    }
}
