import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { JobRegistryResponse } from '../../domain/job-registry.response';
import { JobRegistryMapper } from '../../domain/job-registry.mapper';
import { FindJobRegistryQuery } from './find-job-registry.query';
import { FindJobRegistryService } from './find-job-registry.service';

@QueryHandler(FindJobRegistryQuery)
export class FindJobRegistryQueryHandler implements IQueryHandler<FindJobRegistryQuery>
{
    private readonly mapper: JobRegistryMapper = new JobRegistryMapper();

    constructor(
        private readonly findJobRegistryService: FindJobRegistryService,
    ) {}

    async execute(query: FindJobRegistryQuery): Promise<JobRegistryResponse>
    {
        const jobRegistry = await this.findJobRegistryService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(jobRegistry);
    }
}