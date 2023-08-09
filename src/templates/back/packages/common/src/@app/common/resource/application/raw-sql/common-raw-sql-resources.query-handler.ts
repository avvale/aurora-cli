import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CommonResourceResponse } from '../../domain/common-resource.response';
import { CommonResourceMapper } from '../../domain/common-resource.mapper';
import { CommonRawSQLResourcesQuery } from './common-raw-sql-resources.query';
import { CommonRawSQLResourcesService } from './common-raw-sql-resources.service';

@QueryHandler(CommonRawSQLResourcesQuery)
export class CommonRawSQLResourcesQueryHandler implements IQueryHandler<CommonRawSQLResourcesQuery>
{
    private readonly mapper: CommonResourceMapper = new CommonResourceMapper();

    constructor(
        private readonly rawSQLResourcesService: CommonRawSQLResourcesService,
    ) {}

    async execute(query: CommonRawSQLResourcesQuery): Promise<CommonResourceResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.rawSQLResourcesService.main(
            query.rawSQL,
            query.cQMetadata,
        ));
    }
}
