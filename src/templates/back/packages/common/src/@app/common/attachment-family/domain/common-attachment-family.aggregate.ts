/* eslint-disable key-spacing */
import { CommonCreatedAttachmentFamilyEvent, CommonDeletedAttachmentFamilyEvent, CommonUpdatedAttachmentFamilyEvent } from '@app/common/attachment-family';
import {
    CommonAttachmentFamilyCreatedAt,
    CommonAttachmentFamilyDeletedAt,
    CommonAttachmentFamilyFitType,
    CommonAttachmentFamilyFormat,
    CommonAttachmentFamilyHeight,
    CommonAttachmentFamilyId,
    CommonAttachmentFamilyName,
    CommonAttachmentFamilyQuality,
    CommonAttachmentFamilyResourceId,
    CommonAttachmentFamilySizes,
    CommonAttachmentFamilyUpdatedAt,
    CommonAttachmentFamilyWidth,
} from '@app/common/attachment-family/domain/value-objects';
import { CommonResource } from '@app/common/resource';
import { LiteralObject, Utils } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

export class CommonAttachmentFamily extends AggregateRoot
{
    id: CommonAttachmentFamilyId;
    resourceId: CommonAttachmentFamilyResourceId;
    name: CommonAttachmentFamilyName;
    width: CommonAttachmentFamilyWidth;
    height: CommonAttachmentFamilyHeight;
    fitType: CommonAttachmentFamilyFitType;
    quality: CommonAttachmentFamilyQuality;
    sizes: CommonAttachmentFamilySizes;
    format: CommonAttachmentFamilyFormat;
    createdAt: CommonAttachmentFamilyCreatedAt;
    updatedAt: CommonAttachmentFamilyUpdatedAt;
    deletedAt: CommonAttachmentFamilyDeletedAt;
    resource: CommonResource;

    constructor(
        id: CommonAttachmentFamilyId,
        resourceId: CommonAttachmentFamilyResourceId,
        name: CommonAttachmentFamilyName,
        width: CommonAttachmentFamilyWidth,
        height: CommonAttachmentFamilyHeight,
        fitType: CommonAttachmentFamilyFitType,
        quality: CommonAttachmentFamilyQuality,
        sizes: CommonAttachmentFamilySizes,
        format: CommonAttachmentFamilyFormat,
        createdAt: CommonAttachmentFamilyCreatedAt,
        updatedAt: CommonAttachmentFamilyUpdatedAt,
        deletedAt: CommonAttachmentFamilyDeletedAt,
        resource?: CommonResource,
    )
    {
        super();
        this.id = id;
        this.resourceId = resourceId;
        this.name = name;
        this.width = width;
        this.height = height;
        this.fitType = fitType;
        this.quality = quality;
        this.sizes = sizes;
        this.format = format;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
        this.resource = resource;
    }

    static register(
        id: CommonAttachmentFamilyId,
        resourceId: CommonAttachmentFamilyResourceId,
        name: CommonAttachmentFamilyName,
        width: CommonAttachmentFamilyWidth,
        height: CommonAttachmentFamilyHeight,
        fitType: CommonAttachmentFamilyFitType,
        quality: CommonAttachmentFamilyQuality,
        sizes: CommonAttachmentFamilySizes,
        format: CommonAttachmentFamilyFormat,
        createdAt: CommonAttachmentFamilyCreatedAt,
        updatedAt: CommonAttachmentFamilyUpdatedAt,
        deletedAt: CommonAttachmentFamilyDeletedAt,
        resource?: CommonResource,
    ): CommonAttachmentFamily
    {
        return new CommonAttachmentFamily(
            id,
            resourceId,
            name,
            width,
            height,
            fitType,
            quality,
            sizes,
            format,
            createdAt,
            updatedAt,
            deletedAt,
            resource,
        );
    }

    created(attachmentFamily: CommonAttachmentFamily): void
    {
        this.apply(
            new CommonCreatedAttachmentFamilyEvent(
                attachmentFamily.id.value,
                attachmentFamily.resourceId.value,
                attachmentFamily.name.value,
                attachmentFamily.width?.value,
                attachmentFamily.height?.value,
                attachmentFamily.fitType?.value,
                attachmentFamily.quality?.value,
                attachmentFamily.sizes?.value,
                attachmentFamily.format?.value,
                attachmentFamily.createdAt?.value,
                attachmentFamily.updatedAt?.value,
                attachmentFamily.deletedAt?.value,
            ),
        );
    }

    updated(attachmentFamily: CommonAttachmentFamily): void
    {
        this.apply(
            new CommonUpdatedAttachmentFamilyEvent(
                attachmentFamily.id?.value,
                attachmentFamily.resourceId?.value,
                attachmentFamily.name?.value,
                attachmentFamily.width?.value,
                attachmentFamily.height?.value,
                attachmentFamily.fitType?.value,
                attachmentFamily.quality?.value,
                attachmentFamily.sizes?.value,
                attachmentFamily.format?.value,
                attachmentFamily.createdAt?.value,
                attachmentFamily.updatedAt?.value,
                attachmentFamily.deletedAt?.value,
            ),
        );
    }

    deleted(attachmentFamily: CommonAttachmentFamily): void
    {
        this.apply(
            new CommonDeletedAttachmentFamilyEvent(
                attachmentFamily.id.value,
                attachmentFamily.resourceId.value,
                attachmentFamily.name.value,
                attachmentFamily.width?.value,
                attachmentFamily.height?.value,
                attachmentFamily.fitType?.value,
                attachmentFamily.quality?.value,
                attachmentFamily.sizes?.value,
                attachmentFamily.format?.value,
                attachmentFamily.createdAt?.value,
                attachmentFamily.updatedAt?.value,
                attachmentFamily.deletedAt?.value,
            ),
        );
    }

    toDTO(): LiteralObject
    {
        return {
            id: this.id.value,
            resourceId: this.resourceId.value,
            name: this.name.value,
            width: this.width?.value,
            height: this.height?.value,
            fitType: this.fitType?.value,
            quality: this.quality?.value,
            sizes: this.sizes?.value,
            format: this.format?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,
            resource: this.resource?.toDTO(),
        };
    }

    // function called to get data for repository side effect methods
    toRepository(): LiteralObject
    {
        return {
            id: this.id.value,
            resourceId: this.resourceId.value,
            name: this.name.value,
            width: this.width?.value,
            height: this.height?.value,
            fitType: this.fitType?.value,
            quality: this.quality?.value,
            sizes: this.sizes?.value,
            format: this.format?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,
            resource: this.resource?.toDTO(),
        };
    }
}
