import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { QueueResponse } from '../../domain/queue.response';
import { QueueMapper } from '../../domain/queue.mapper';
import { RawSQLQueuesQuery } from './raw-sql-queues.query';
import { RawSQLQueuesService } from './raw-sql-queues.service';

@QueryHandler(RawSQLQueuesQuery)
export class RawSQLQueuesQueryHandler implements IQueryHandler<RawSQLQueuesQuery>
{
    private readonly mapper: QueueMapper = new QueueMapper();

    constructor(
        private readonly rawSQLQueuesService: RawSQLQueuesService,
    ) {}

    async execute(query: RawSQLQueuesQuery): Promise<QueueResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.rawSQLQueuesService.main(
            query.rawSQL,
            query.cQMetadata,
        ));
    }
}