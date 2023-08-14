import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { QueueManagerQueueResponse } from '../../domain/queue-manager-queue.response';
import { QueueManagerQueueMapper } from '../../domain/queue-manager-queue.mapper';
import { QueueManagerRawSQLQueuesQuery } from './queue-manager-raw-sql-queues.query';
import { QueueManagerRawSQLQueuesService } from './queue-manager-raw-sql-queues.service';

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
