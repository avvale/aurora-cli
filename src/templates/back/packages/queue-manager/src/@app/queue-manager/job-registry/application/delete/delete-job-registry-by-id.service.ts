import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
import { JobRegistryId } from '../../domain/value-objects';
import { IJobRegistryRepository } from '../../domain/job-registry.repository';

@Injectable()
export class DeleteJobRegistryByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IJobRegistryRepository,
    ) {}

    async main(
        id: JobRegistryId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // get object to delete
        const jobRegistry = await this.repository.findById(id, { constraint, cQMetadata });

        // it is not necessary to pass the constraint in the delete, if the object
        // is not found in the findById, an exception will be thrown.
        await this.repository.deleteById(
            jobRegistry.id,
            {
                deleteOptions: cQMetadata?.repositoryOptions,
                cQMetadata,
            },
        );

        // insert EventBus in object, to be able to apply and commit events
        const jobRegistryRegister = this.publisher.mergeObjectContext(jobRegistry);

        jobRegistryRegister.deleted(jobRegistry); // apply event to model events
        jobRegistryRegister.commit(); // commit all events of model
    }
}