import { Injectable } from '@nestjs/common';
import { CQMetadata } from '@aurora-ts/core';
import { IQueueRepository } from '../../domain/queue.repository';
import { QueueManagerQueue } from '../../domain/queue.aggregate';

@Injectable()
export class RawSQLQueuesService
{
    constructor(
        private readonly repository: IQueueRepository,
    ) {}

    async main(
        rawSQL?: string,
        cQMetadata?: CQMetadata,
    ): Promise<QueueManagerQueue[]>
    {
        return await this.repository.rawSQL({
            rawSQL,
            cQMetadata,
        });
    }
}