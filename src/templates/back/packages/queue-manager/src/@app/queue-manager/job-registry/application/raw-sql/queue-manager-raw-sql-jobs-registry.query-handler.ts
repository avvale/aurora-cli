import { QueueManagerJobRegistryMapper, QueueManagerJobRegistryResponse, QueueManagerRawSQLJobsRegistryQuery } from '@app/queue-manager/job-registry';
import { QueueManagerRawSQLJobsRegistryService } from '@app/queue-manager/job-registry/application/raw-sql/queue-manager-raw-sql-jobs-registry.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

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
