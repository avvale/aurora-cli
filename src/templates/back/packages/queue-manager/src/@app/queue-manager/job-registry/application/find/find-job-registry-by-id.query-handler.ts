import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { JobRegistryResponse } from '../../domain/job-registry.response';
import { JobRegistryMapper } from '../../domain/job-registry.mapper';
import { JobRegistryId } from '../../domain/value-objects';
import { FindJobRegistryByIdQuery } from './find-job-registry-by-id.query';
import { FindJobRegistryByIdService } from './find-job-registry-by-id.service';

@QueryHandler(FindJobRegistryByIdQuery)
export class FindJobRegistryByIdQueryHandler implements IQueryHandler<FindJobRegistryByIdQuery>
{
    private readonly mapper: JobRegistryMapper = new JobRegistryMapper();

    constructor(
        private readonly findJobRegistryByIdService: FindJobRegistryByIdService,
    ) {}

    async execute(query: FindJobRegistryByIdQuery): Promise<JobRegistryResponse>
    {
        const jobRegistry = await this.findJobRegistryByIdService.main(
            new JobRegistryId(query.id),
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(jobRegistry);
    }
}