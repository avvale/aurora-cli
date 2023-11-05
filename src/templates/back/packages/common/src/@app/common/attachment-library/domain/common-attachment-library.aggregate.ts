/* eslint-disable key-spacing */
import { CommonCreatedAttachmentLibraryEvent, CommonDeletedAttachmentLibraryEvent, CommonUpdatedAttachmentLibraryEvent } from '@app/common/attachment-library';
import {
    CommonAttachmentLibraryCreatedAt,
    CommonAttachmentLibraryDeletedAt,
    CommonAttachmentLibraryExtension,
    CommonAttachmentLibraryFilename,
    CommonAttachmentLibraryHeight,
    CommonAttachmentLibraryId,
    CommonAttachmentLibraryMeta,
    CommonAttachmentLibraryMimetype,
    CommonAttachmentLibraryRelativePathSegments,
    CommonAttachmentLibrarySize,
    CommonAttachmentLibraryUpdatedAt,
    CommonAttachmentLibraryUrl,
    CommonAttachmentLibraryWidth,
} from '@app/common/attachment-library/domain/value-objects';
import { LiteralObject, Utils } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

export class CommonAttachmentLibrary extends AggregateRoot
{
    id: CommonAttachmentLibraryId;
    filename: CommonAttachmentLibraryFilename;
    mimetype: CommonAttachmentLibraryMimetype;
    extension: CommonAttachmentLibraryExtension;
    relativePathSegments: CommonAttachmentLibraryRelativePathSegments;
    width: CommonAttachmentLibraryWidth;
    height: CommonAttachmentLibraryHeight;
    size: CommonAttachmentLibrarySize;
    url: CommonAttachmentLibraryUrl;
    meta: CommonAttachmentLibraryMeta;
    createdAt: CommonAttachmentLibraryCreatedAt;
    updatedAt: CommonAttachmentLibraryUpdatedAt;
    deletedAt: CommonAttachmentLibraryDeletedAt;

    constructor(
        id: CommonAttachmentLibraryId,
        filename: CommonAttachmentLibraryFilename,
        mimetype: CommonAttachmentLibraryMimetype,
        extension: CommonAttachmentLibraryExtension,
        relativePathSegments: CommonAttachmentLibraryRelativePathSegments,
        width: CommonAttachmentLibraryWidth,
        height: CommonAttachmentLibraryHeight,
        size: CommonAttachmentLibrarySize,
        url: CommonAttachmentLibraryUrl,
        meta: CommonAttachmentLibraryMeta,
        createdAt: CommonAttachmentLibraryCreatedAt,
        updatedAt: CommonAttachmentLibraryUpdatedAt,
        deletedAt: CommonAttachmentLibraryDeletedAt,
    )
    {
        super();
        this.id = id;
        this.filename = filename;
        this.mimetype = mimetype;
        this.extension = extension;
        this.relativePathSegments = relativePathSegments;
        this.width = width;
        this.height = height;
        this.size = size;
        this.url = url;
        this.meta = meta;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
    }

    static register(
        id: CommonAttachmentLibraryId,
        filename: CommonAttachmentLibraryFilename,
        mimetype: CommonAttachmentLibraryMimetype,
        extension: CommonAttachmentLibraryExtension,
        relativePathSegments: CommonAttachmentLibraryRelativePathSegments,
        width: CommonAttachmentLibraryWidth,
        height: CommonAttachmentLibraryHeight,
        size: CommonAttachmentLibrarySize,
        url: CommonAttachmentLibraryUrl,
        meta: CommonAttachmentLibraryMeta,
        createdAt: CommonAttachmentLibraryCreatedAt,
        updatedAt: CommonAttachmentLibraryUpdatedAt,
        deletedAt: CommonAttachmentLibraryDeletedAt,
    ): CommonAttachmentLibrary
    {
        return new CommonAttachmentLibrary(
            id,
            filename,
            mimetype,
            extension,
            relativePathSegments,
            width,
            height,
            size,
            url,
            meta,
            createdAt,
            updatedAt,
            deletedAt,
        );
    }

    created(attachmentLibrary: CommonAttachmentLibrary): void
    {
        this.apply(
            new CommonCreatedAttachmentLibraryEvent(
                attachmentLibrary.id.value,
                attachmentLibrary.filename.value,
                attachmentLibrary.mimetype.value,
                attachmentLibrary.extension.value,
                attachmentLibrary.relativePathSegments.value,
                attachmentLibrary.width.value,
                attachmentLibrary.height.value,
                attachmentLibrary.size.value,
                attachmentLibrary.url.value,
                attachmentLibrary.meta?.value,
                attachmentLibrary.createdAt?.value,
                attachmentLibrary.updatedAt?.value,
                attachmentLibrary.deletedAt?.value,
            ),
        );
    }

    updated(attachmentLibrary: CommonAttachmentLibrary): void
    {
        this.apply(
            new CommonUpdatedAttachmentLibraryEvent(
                attachmentLibrary.id?.value,
                attachmentLibrary.filename?.value,
                attachmentLibrary.mimetype?.value,
                attachmentLibrary.extension?.value,
                attachmentLibrary.relativePathSegments?.value,
                attachmentLibrary.width?.value,
                attachmentLibrary.height?.value,
                attachmentLibrary.size?.value,
                attachmentLibrary.url?.value,
                attachmentLibrary.meta?.value,
                attachmentLibrary.createdAt?.value,
                attachmentLibrary.updatedAt?.value,
                attachmentLibrary.deletedAt?.value,
            ),
        );
    }

    deleted(attachmentLibrary: CommonAttachmentLibrary): void
    {
        this.apply(
            new CommonDeletedAttachmentLibraryEvent(
                attachmentLibrary.id.value,
                attachmentLibrary.filename.value,
                attachmentLibrary.mimetype.value,
                attachmentLibrary.extension.value,
                attachmentLibrary.relativePathSegments.value,
                attachmentLibrary.width.value,
                attachmentLibrary.height.value,
                attachmentLibrary.size.value,
                attachmentLibrary.url.value,
                attachmentLibrary.meta?.value,
                attachmentLibrary.createdAt?.value,
                attachmentLibrary.updatedAt?.value,
                attachmentLibrary.deletedAt?.value,
            ),
        );
    }

    toDTO(): LiteralObject
    {
        return {
            id: this.id.value,
            filename: this.filename.value,
            mimetype: this.mimetype.value,
            extension: this.extension.value,
            relativePathSegments: this.relativePathSegments.value,
            width: this.width.value,
            height: this.height.value,
            size: this.size.value,
            url: this.url.value,
            meta: this.meta?.value,
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
            filename: this.filename.value,
            mimetype: this.mimetype.value,
            extension: this.extension.value,
            relativePathSegments: this.relativePathSegments.value,
            width: this.width.value,
            height: this.height.value,
            size: this.size.value,
            url: this.url.value,
            meta: this.meta?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,
        };
    }
}
