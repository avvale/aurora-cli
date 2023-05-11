import { Injectable } from '@nestjs/common';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { IJobRegistryRepository } from '../../domain/job-registry.repository';
import { QueueManagerJobRegistry } from '../../domain/job-registry.aggregate';
import { JobRegistryId } from '../../domain/value-objects';

@Injectable()
export class FindJobRegistryByIdService
{
    constructor(
        private readonly repository: IJobRegistryRepository,
    ) {}

    async main(
        id: JobRegistryId,
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