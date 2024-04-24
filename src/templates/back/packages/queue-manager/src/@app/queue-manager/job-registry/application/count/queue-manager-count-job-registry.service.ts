import { QueueManagerIJobRegistryRepository } from '@app/queue-manager/job-registry';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class QueueManagerCountJobRegistryService
{
    constructor(
        private readonly repository: QueueManagerIJobRegistryRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<number>
    {
        return await this.repository.count(
            {
                queryStatement,
                constraint,
                cQMetadata,
            },
        );
    }
}
