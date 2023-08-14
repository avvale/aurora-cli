import { CommonAddResourcesContextEvent, CommonIResourceRepository, CommonResource } from '@app/common/resource';
import {
    CommonResourceCode,
    CommonResourceCreatedAt,
    CommonResourceDeletedAt,
    CommonResourceHasAttachments,
    CommonResourceId,
    CommonResourceIsActive,
    CommonResourceName,
    CommonResourceUpdatedAt,
} from '@app/common/resource/domain/value-objects';
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class CommonCreateResourcesService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: CommonIResourceRepository,
    ) {}

    async main(
        resources: {
            id: CommonResourceId;
            code: CommonResourceCode;
            name: CommonResourceName;
            isActive: CommonResourceIsActive;
            hasAttachments: CommonResourceHasAttachments;
        } [],
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const aggregateResources = resources.map(resource => CommonResource.register(
            resource.id,
            resource.code,
            resource.name,
            resource.isActive,
            resource.hasAttachments,
            new CommonResourceCreatedAt({ currentTimestamp: true }),
            new CommonResourceUpdatedAt({ currentTimestamp: true }),
            null, // deleteAt
        ));

        // insert
        await this.repository.insert(
            aggregateResources,
            {
                insertOptions: cQMetadata?.repositoryOptions,
            },
        );

        // create AddResourcesContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const resourcesRegistered = this.publisher.mergeObjectContext(new CommonAddResourcesContextEvent(aggregateResources));

        resourcesRegistered.created(); // apply event to model events
        resourcesRegistered.commit(); // commit all events of model
    }
}
