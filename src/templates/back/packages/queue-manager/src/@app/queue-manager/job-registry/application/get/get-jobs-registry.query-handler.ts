import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { JobRegistryResponse } from '../../domain/job-registry.response';
import { JobRegistryMapper } from '../../domain/job-registry.mapper';
import { GetJobsRegistryQuery } from './get-jobs-registry.query';
import { GetJobsRegistryService } from './get-jobs-registry.service';

@QueryHandler(GetJobsRegistryQuery)
export class GetJobsRegistryQueryHandler implements IQueryHandler<GetJobsRegistryQuery>
{
    private readonly mapper: JobRegistryMapper = new JobRegistryMapper();

    constructor(
        private readonly getJobsRegistryService: GetJobsRegistryService,
    ) {}

    async execute(query: GetJobsRegistryQuery): Promise<JobRegistryResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.getJobsRegistryService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        ));
    }
}