import { QueueManagerQueueMapper, QueueManagerQueueResponse, QueueManagerRawSQLQueuesQuery } from '@app/queue-manager/queue';
import { QueueManagerRawSQLQueuesService } from '@app/queue-manager/queue/application/raw-sql/queue-manager-raw-sql-queues.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(QueueManagerRawSQLQueuesQuery)
export class QueueManagerRawSQLQueuesQueryHandler implements IQueryHandler<QueueManagerRawSQLQueuesQuery>
{
    private readonly mapper: QueueManagerQueueMapper = new QueueManagerQueueMapper();

    constructor(
        private readonly rawSQLQueuesService: QueueManagerRawSQLQueuesService,
    ) {}

    async execute(query: QueueManagerRawSQLQueuesQuery): Promise<QueueManagerQueueResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.rawSQLQueuesService.main(
            query.rawSQL,
            query.cQMetadata,
        ));
    }
}
