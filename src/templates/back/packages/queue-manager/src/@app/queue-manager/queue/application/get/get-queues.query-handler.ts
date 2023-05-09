import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { QueueResponse } from '../../domain/queue.response';
import { QueueMapper } from '../../domain/queue.mapper';
import { GetQueuesQuery } from './get-queues.query';
import { GetQueuesService } from './get-queues.service';

@QueryHandler(GetQueuesQuery)
export class GetQueuesQueryHandler implements IQueryHandler<GetQueuesQuery>
{
    private readonly mapper: QueueMapper = new QueueMapper();

    constructor(
        private readonly getQueuesService: GetQueuesService,
    ) {}

    async execute(query: GetQueuesQuery): Promise<QueueResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.getQueuesService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        ));
    }
}