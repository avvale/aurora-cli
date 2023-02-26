import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ApplicationResponse } from '../../domain/application.response';
import { ApplicationMapper } from '../../domain/application.mapper';
import { RawSQLApplicationsQuery } from './raw-sql-applications.query';
import { RawSQLApplicationsService } from './raw-sql-applications.service';

@QueryHandler(RawSQLApplicationsQuery)
export class RawSQLApplicationsQueryHandler implements IQueryHandler<RawSQLApplicationsQuery>
{
    private readonly mapper: ApplicationMapper = new ApplicationMapper();

    constructor(
        private readonly rawSQLApplicationsService: RawSQLApplicationsService,
    ) {}

    async execute(query: RawSQLApplicationsQuery): Promise<ApplicationResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.rawSQLApplicationsService.main(query.rawSQL, query.cQMetadata));
    }
}