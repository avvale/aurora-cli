import {
    QueueManagerIQueueRepository,
    QueueManagerQueue,
} from '@app/queue-manager/queue';
import { QueueManagerQueueId } from '@app/queue-manager/queue/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class QueueManagerFindQueueByIdService {
    constructor(private readonly repository: QueueManagerIQueueRepository) {}

    async main(
        id: QueueManagerQueueId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<QueueManagerQueue> {
        return await this.repository.findById(id, {
            constraint,
            cQMetadata,
        });
    }
}
