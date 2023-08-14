import { Injectable } from '@nestjs/common';
import { CQMetadata } from '@aurorajs.dev/core';
import { QueueManagerIJobRegistryRepository } from '../../domain/queue-manager-job-registry.repository';
import { QueueManagerJobRegistry } from '../../domain/queue-manager-job-registry.aggregate';

@Injectable()
export class QueueManagerRawSQLJobsRegistryService
{
    constructor(
        private readonly repository: QueueManagerIJobRegistryRepository,
    ) {}

    async main(
        rawSQL?: string,
        cQMetadata?: CQMetadata,
    ): Promise<QueueManagerJobRegistry[]>
    {
        return await this.repository.rawSQL({
            rawSQL,
            cQMetadata,
        });
    }
}
