import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { QueueManagerJobRegistryResponse } from '../../domain/queue-manager-job-registry.response';
import { QueueManagerJobRegistryMapper } from '../../domain/queue-manager-job-registry.mapper';
import { QueueManagerRawSQLJobsRegistryQuery } from './queue-manager-raw-sql-jobs-registry.query';
import { QueueManagerRawSQLJobsRegistryService } from './queue-manager-raw-sql-jobs-registry.service';

@QueryHandler(QueueManagerRawSQLJobsRegistryQuery)
export class QueueManagerRawSQLJobsRegistryQueryHandler implements IQueryHandler<QueueManagerRawSQLJobsRegistryQuery>
{
    private readonly mapper: QueueManagerJobRegistryMapper = new QueueManagerJobRegistryMapper();

    constructor(
        private readonly rawSQLJobsRegistryService: QueueManagerRawSQLJobsRegistryService,
    ) {}

    async execute(query: QueueManagerRawSQLJobsRegistryQuery): Promise<QueueManagerJobRegistryResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.rawSQLJobsRegistryService.main(
            query.rawSQL,
            query.cQMetadata,
        ));
    }
}
