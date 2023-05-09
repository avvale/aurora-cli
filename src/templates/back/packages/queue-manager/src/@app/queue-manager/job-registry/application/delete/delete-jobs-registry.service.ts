import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@aurora-ts/core';
import { CQMetadata } from '@aurora-ts/core';
import { IJobRegistryRepository } from '../../domain/job-registry.repository';
import { AddJobsRegistryContextEvent } from '../events/add-jobs-registry-context.event';

@Injectable()
export class DeleteJobsRegistryService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IJobRegistryRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // get objects to delete
        const jobsRegistry = await this.repository.get({
            queryStatement,
            constraint,
            cQMetadata,
        });

        await this.repository.delete({
            queryStatement,
            constraint,
            cQMetadata,
            deleteOptions: cQMetadata?.repositoryOptions,
        });

        // create AddJobsRegistryContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const jobsRegistryRegistered = this.publisher.mergeObjectContext(
            new AddJobsRegistryContextEvent(jobsRegistry),
        );

        jobsRegistryRegistered.deleted(); // apply event to model events
        jobsRegistryRegistered.commit(); // commit all events of model
    }
}