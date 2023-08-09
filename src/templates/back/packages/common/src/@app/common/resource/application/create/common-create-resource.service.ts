import { CommonIResourceRepository, CommonResource } from '@app/common/resource';
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
export class CommonCreateResourceService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: CommonIResourceRepository,
    ) {}

    async main(
        payload: {
            id: CommonResourceId;
            code: CommonResourceCode;
            name: CommonResourceName;
            isActive: CommonResourceIsActive;
            hasAttachments: CommonResourceHasAttachments;
        },
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
            new CommonResourceCreatedAt({ currentTimestamp: true }),
            new CommonResourceUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );

        await this.repository.create(
            resource,
            {
                createOptions: cQMetadata?.repositoryOptions,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const resourceRegister = this.publisher.mergeObjectContext(
            resource,
        );

        resourceRegister.created(resource); // apply event to model events
        resourceRegister.commit(); // commit all events of model
    }
}
