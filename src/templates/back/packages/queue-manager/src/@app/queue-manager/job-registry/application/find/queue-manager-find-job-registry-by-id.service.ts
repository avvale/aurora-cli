import { QueueManagerIJobRegistryRepository, QueueManagerJobRegistry } from '@app/queue-manager/job-registry';
import { QueueManagerJobRegistryId } from '@app/queue-manager/job-registry/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

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
