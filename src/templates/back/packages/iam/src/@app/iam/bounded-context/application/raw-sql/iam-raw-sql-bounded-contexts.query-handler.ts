import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IamBoundedContextResponse } from '../../domain/iam-bounded-context.response';
import { IamBoundedContextMapper } from '../../domain/iam-bounded-context.mapper';
import { IamRawSQLBoundedContextsQuery } from './iam-raw-sql-bounded-contexts.query';
import { IamRawSQLBoundedContextsService } from './iam-raw-sql-bounded-contexts.service';

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
