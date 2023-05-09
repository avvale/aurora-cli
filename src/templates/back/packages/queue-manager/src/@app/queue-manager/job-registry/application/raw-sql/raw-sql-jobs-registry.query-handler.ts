import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { JobRegistryResponse } from '../../domain/job-registry.response';
import { JobRegistryMapper } from '../../domain/job-registry.mapper';
import { RawSQLJobsRegistryQuery } from './raw-sql-jobs-registry.query';
import { RawSQLJobsRegistryService } from './raw-sql-jobs-registry.service';

@QueryHandler(RawSQLJobsRegistryQuery)
export class RawSQLJobsRegistryQueryHandler implements IQueryHandler<RawSQLJobsRegistryQuery>
{
    private readonly mapper: JobRegistryMapper = new JobRegistryMapper();

    constructor(
        private readonly rawSQLJobsRegistryService: RawSQLJobsRegistryService,
    ) {}

    async execute(query: RawSQLJobsRegistryQuery): Promise<JobRegistryResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.rawSQLJobsRegistryService.main(
            query.rawSQL,
            query.cQMetadata,
        ));
    }
}