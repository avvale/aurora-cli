import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CommonResourceResponse } from '../../domain/common-resource.response';
import { CommonResourceMapper } from '../../domain/common-resource.mapper';
import { CommonGetResourcesQuery } from './common-get-resources.query';
import { CommonGetResourcesService } from './common-get-resources.service';

@QueryHandler(CommonGetResourcesQuery)
export class CommonGetResourcesQueryHandler implements IQueryHandler<CommonGetResourcesQuery>
{
    private readonly mapper: CommonResourceMapper = new CommonResourceMapper();

    constructor(
        private readonly getResourcesService: CommonGetResourcesService,
    ) {}

    async execute(query: CommonGetResourcesQuery): Promise<CommonResourceResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.getResourcesService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        ));
    }
}
