import { Injectable } from '@nestjs/common';
import { CQMetadata } from '@aurora-ts/core';
import { IJobRegistryRepository } from '../../domain/job-registry.repository';
import { QueueManagerJobRegistry } from '../../domain/job-registry.aggregate';

@Injectable()
export class RawSQLJobsRegistryService
{
    constructor(
        private readonly repository: IJobRegistryRepository,
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