import { IamBoundedContextMapper, IamBoundedContextResponse, IamRawSQLBoundedContextsQuery } from '@app/iam/bounded-context';
import { IamRawSQLBoundedContextsService } from '@app/iam/bounded-context/application/raw-sql/iam-raw-sql-bounded-contexts.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(IamRawSQLBoundedContextsQuery)
export class IamRawSQLBoundedContextsQueryHandler implements IQueryHandler<IamRawSQLBoundedContextsQuery>
{
    private readonly mapper: IamBoundedContextMapper = new IamBoundedContextMapper();

    constructor(
        private readonly rawSQLBoundedContextsService: IamRawSQLBoundedContextsService,
    ) {}

    async execute(query: IamRawSQLBoundedContextsQuery): Promise<IamBoundedContextResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.rawSQLBoundedContextsService.main(
            query.rawSQL,
            query.cQMetadata,
        ));
    }
}
