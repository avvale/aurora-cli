/* eslint-disable key-spacing */
import { CommonCreatedResourceEvent, CommonDeletedResourceEvent, CommonUpdatedResourceEvent } from '@app/common/resource';
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
import { LiteralObject, Utils } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

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
    }

    static register(
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
        };
    }
}
