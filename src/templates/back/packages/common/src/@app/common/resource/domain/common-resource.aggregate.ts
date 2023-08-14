/* eslint-disable key-spacing */
import { AggregateRoot } from '@nestjs/cqrs';
import { LiteralObject, Utils } from '@aurorajs.dev/core';
import {
    CommonResourceId,
    CommonResourceCode,
    CommonResourceName,
    CommonResourceIsActive,
    CommonResourceHasAttachments,
    CommonResourceCreatedAt,
    CommonResourceUpdatedAt,
    CommonResourceDeletedAt,
} from './value-objects';
import { CommonCreatedResourceEvent } from '../application/events/common-created-resource.event';
import { CommonUpdatedResourceEvent } from '../application/events/common-updated-resource.event';
import { CommonDeletedResourceEvent } from '../application/events/common-deleted-resource.event';

export class CommonResource extends AggregateRoot
{
    id: CommonResourceId;
    code: CommonResourceCode;
    name: CommonResourceName;
    isActive: CommonResourceIsActive;
    hasAttachments: CommonResourceHasAttachments;
    createdAt: CommonResourceCreatedAt;
    updatedAt: CommonResourceUpdatedAt;
    deletedAt: CommonResourceDeletedAt;

    // eager relationship

    constructor(
        id: CommonResourceId,
        code: CommonResourceCode,
        name: CommonResourceName,
        isActive: CommonResourceIsActive,
        hasAttachments: CommonResourceHasAttachments,
        createdAt: CommonResourceCreatedAt,
        updatedAt: CommonResourceUpdatedAt,
        deletedAt: CommonResourceDeletedAt,

    )
    {
        super();
        this.id = id;
        this.code = code;
        this.name = name;
        this.isActive = isActive;
        this.hasAttachments = hasAttachments;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;

        // eager relationship
    }

    static register (
        id: CommonResourceId,
        code: CommonResourceCode,
        name: CommonResourceName,
        isActive: CommonResourceIsActive,
        hasAttachments: CommonResourceHasAttachments,
        createdAt: CommonResourceCreatedAt,
        updatedAt: CommonResourceUpdatedAt,
        deletedAt: CommonResourceDeletedAt,

    ): CommonResource
    {
        return new CommonResource(
            id,
            code,
            name,
            isActive,
            hasAttachments,
            createdAt,
            updatedAt,
            deletedAt,

        );
    }

    created(resource: CommonResource): void
    {
        this.apply(
            new CommonCreatedResourceEvent(
                resource.id.value,
                resource.code.value,
                resource.name.value,
                resource.isActive.value,
                resource.hasAttachments.value,
                resource.createdAt?.value,
                resource.updatedAt?.value,
                resource.deletedAt?.value,
            ),
        );
    }

    updated(resource: CommonResource): void
    {
        this.apply(
            new CommonUpdatedResourceEvent(
                resource.id?.value,
                resource.code?.value,
                resource.name?.value,
                resource.isActive?.value,
                resource.hasAttachments?.value,
                resource.createdAt?.value,
                resource.updatedAt?.value,
                resource.deletedAt?.value,
            ),
        );
    }

    deleted(resource: CommonResource): void
    {
        this.apply(
            new CommonDeletedResourceEvent(
                resource.id.value,
                resource.code.value,
                resource.name.value,
                resource.isActive.value,
                resource.hasAttachments.value,
                resource.createdAt?.value,
                resource.updatedAt?.value,
                resource.deletedAt?.value,
            ),
        );
    }

    toDTO(): LiteralObject
    {
        return {
            id: this.id.value,
            code: this.code.value,
            name: this.name.value,
            isActive: this.isActive.value,
            hasAttachments: this.hasAttachments.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,

            // eager relationship
        };
    }

    // function called to get data for repository side effect methods
    toRepository(): LiteralObject
    {
        return {
            id: this.id.value,
            code: this.code.value,
            name: this.name.value,
            isActive: this.isActive.value,
            hasAttachments: this.hasAttachments.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,

            // eager relationship
        };
    }
}
