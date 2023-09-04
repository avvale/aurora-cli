import { CommonGetResourcesQuery, CommonResourceMapper, CommonResourceResponse } from '@app/common/resource';
import { CommonGetResourcesService } from '@app/common/resource/application/get/common-get-resources.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

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
