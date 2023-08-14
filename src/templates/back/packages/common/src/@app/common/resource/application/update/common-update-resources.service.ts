import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
import {
    CommonResourceId,
    CommonResourceCode,
    CommonResourceName,
    CommonResourceIsActive,
    CommonResourceHasAttachments,
    CommonResourceCreatedAt,
    CommonResourceUpdatedAt,
    CommonResourceDeletedAt,
} from '../../domain/value-objects';
import { CommonIResourceRepository } from '../../domain/common-resource.repository';
import { CommonResource } from '../../domain/common-resource.aggregate';
import { CommonAddResourcesContextEvent } from '../events/common-add-resources-context.event';

@Injectable()
export class CommonUpdateResourcesService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: CommonIResourceRepository,
    ) {}

    async main(
        payload: {
            id?: CommonResourceId;
            code?: CommonResourceCode;
            name?: CommonResourceName;
            isActive?: CommonResourceIsActive;
            hasAttachments?: CommonResourceHasAttachments;
        },
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const resource = CommonResource.register(
            payload.id,
            payload.code,
            payload.name,
            payload.isActive,
            payload.hasAttachments,
            null, // createdAt
            new CommonResourceUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );


        // update
        await this.repository.update(
            resource,
            {
                queryStatement,
                constraint,
                cQMetadata,
                updateOptions: cQMetadata?.repositoryOptions,
            },
        );

        // get objects to delete
        const resources = await this.repository.get(
            {
                queryStatement,
                constraint,
                cQMetadata,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const resourcesRegister = this.publisher.mergeObjectContext(
            new CommonAddResourcesContextEvent(resources),
        );

        resourcesRegister.updated(); // apply event to model events
        resourcesRegister.commit(); // commit all events of model
    }
}
