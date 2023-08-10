import { Injectable } from '@nestjs/common';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { QueueManagerIJobRegistryRepository } from '../../domain/queue-manager-job-registry.repository';
import { QueueManagerJobRegistry } from '../../domain/queue-manager-job-registry.aggregate';
import { QueueManagerJobRegistryId } from '../../domain/value-objects';

@Injectable()
export class QueueManagerFindJobRegistryByIdService
{
    constructor(
        private readonly repository: QueueManagerIJobRegistryRepository,
    ) {}

    async main(
        id: QueueManagerJobRegistryId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<QueueManagerJobRegistry>
    {
        return await this.repository.findById(
            id,
            {
                constraint,
                cQMetadata,
            },
        );
    }
}
