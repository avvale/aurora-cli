import { QueueManagerIJobRegistryRepository } from '@app/queue-manager/job-registry';
import { QueueManagerJobRegistryId } from '@app/queue-manager/job-registry/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class QueueManagerDeleteJobRegistryByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: QueueManagerIJobRegistryRepository,
    ) {}

    async main(
        id: QueueManagerJobRegistryId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // get object to delete
        const jobRegistry = await this.repository
            .findById(
                id,
                {
                    constraint,
                    cQMetadata,
                },
            );

        // it is not necessary to pass the constraint in the delete, if the object
        // is not found in the findById, an exception will be thrown.
        await this.repository
            .deleteById(
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
