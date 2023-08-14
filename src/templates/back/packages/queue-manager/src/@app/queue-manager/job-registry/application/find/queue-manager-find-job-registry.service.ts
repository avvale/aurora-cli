import { QueueManagerIJobRegistryRepository, QueueManagerJobRegistry } from '@app/queue-manager/job-registry';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class QueueManagerFindJobRegistryService
{
    constructor(
        private readonly repository: QueueManagerIJobRegistryRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<QueueManagerJobRegistry>
    {
        return await this.repository.find(
            {
                queryStatement,
                constraint,
                cQMetadata,
            },
        );
    }
}
