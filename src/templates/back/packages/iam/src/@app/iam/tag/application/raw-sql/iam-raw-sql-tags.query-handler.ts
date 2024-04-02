import { IamRawSQLTagsQuery, IamTagMapper, IamTagResponse } from '@app/iam/tag';
import { IamRawSQLTagsService } from '@app/iam/tag/application/raw-sql/iam-raw-sql-tags.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(IamRawSQLTagsQuery)
export class IamRawSQLTagsQueryHandler implements IQueryHandler<IamRawSQLTagsQuery>
{
    private readonly mapper: IamTagMapper = new IamTagMapper();

    constructor(
        private readonly rawSQLTagsService: IamRawSQLTagsService,
    ) {}

    async execute(query: IamRawSQLTagsQuery): Promise<IamTagResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.rawSQLTagsService.main(
            query.rawSQL,
            query.cQMetadata,
        ));
    }
}
