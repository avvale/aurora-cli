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
    CommonAttachmentLibraryMime,
    CommonAttachmentLibraryName,
    CommonAttachmentLibraryPath,
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
    name: CommonAttachmentLibraryName;
    path: CommonAttachmentLibraryPath;
    filename: CommonAttachmentLibraryFilename;
    url: CommonAttachmentLibraryUrl;
    mime: CommonAttachmentLibraryMime;
    extension: CommonAttachmentLibraryExtension;
    size: CommonAttachmentLibrarySize;
    width: CommonAttachmentLibraryWidth;
    height: CommonAttachmentLibraryHeight;
    meta: CommonAttachmentLibraryMeta;
    createdAt: CommonAttachmentLibraryCreatedAt;
    updatedAt: CommonAttachmentLibraryUpdatedAt;
    deletedAt: CommonAttachmentLibraryDeletedAt;

    constructor(
        id: CommonAttachmentLibraryId,
        name: CommonAttachmentLibraryName,
        path: CommonAttachmentLibraryPath,
        filename: CommonAttachmentLibraryFilename,
        url: CommonAttachmentLibraryUrl,
        mime: CommonAttachmentLibraryMime,
        extension: CommonAttachmentLibraryExtension,
        size: CommonAttachmentLibrarySize,
        width: CommonAttachmentLibraryWidth,
        height: CommonAttachmentLibraryHeight,
        meta: CommonAttachmentLibraryMeta,
        createdAt: CommonAttachmentLibraryCreatedAt,
        updatedAt: CommonAttachmentLibraryUpdatedAt,
        deletedAt: CommonAttachmentLibraryDeletedAt,
    )
    {
        super();
        this.id = id;
        this.name = name;
        this.path = path;
        this.filename = filename;
        this.url = url;
        this.mime = mime;
        this.extension = extension;
        this.size = size;
        this.width = width;
        this.height = height;
        this.meta = meta;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
    }

    static register(
        id: CommonAttachmentLibraryId,
        name: CommonAttachmentLibraryName,
        path: CommonAttachmentLibraryPath,
        filename: CommonAttachmentLibraryFilename,
        url: CommonAttachmentLibraryUrl,
        mime: CommonAttachmentLibraryMime,
        extension: CommonAttachmentLibraryExtension,
        size: CommonAttachmentLibrarySize,
        width: CommonAttachmentLibraryWidth,
        height: CommonAttachmentLibraryHeight,
        meta: CommonAttachmentLibraryMeta,
        createdAt: CommonAttachmentLibraryCreatedAt,
        updatedAt: CommonAttachmentLibraryUpdatedAt,
        deletedAt: CommonAttachmentLibraryDeletedAt,
    ): CommonAttachmentLibrary
    {
        return new CommonAttachmentLibrary(
            id,
            name,
            path,
            filename,
            url,
            mime,
            extension,
            size,
            width,
            height,
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
                attachmentLibrary.name.value,
                attachmentLibrary.path.value,
                attachmentLibrary.filename.value,
                attachmentLibrary.url.value,
                attachmentLibrary.mime.value,
                attachmentLibrary.extension.value,
                attachmentLibrary.size.value,
                attachmentLibrary.width?.value,
                attachmentLibrary.height?.value,
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
                attachmentLibrary.name?.value,
                attachmentLibrary.path?.value,
                attachmentLibrary.filename?.value,
                attachmentLibrary.url?.value,
                attachmentLibrary.mime?.value,
                attachmentLibrary.extension?.value,
                attachmentLibrary.size?.value,
                attachmentLibrary.width?.value,
                attachmentLibrary.height?.value,
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
                attachmentLibrary.name.value,
                attachmentLibrary.path.value,
                attachmentLibrary.filename.value,
                attachmentLibrary.url.value,
                attachmentLibrary.mime.value,
                attachmentLibrary.extension.value,
                attachmentLibrary.size.value,
                attachmentLibrary.width?.value,
                attachmentLibrary.height?.value,
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
            name: this.name.value,
            path: this.path.value,
            filename: this.filename.value,
            url: this.url.value,
            mime: this.mime.value,
            extension: this.extension.value,
            size: this.size.value,
            width: this.width?.value,
            height: this.height?.value,
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
            name: this.name.value,
            path: this.path.value,
            filename: this.filename.value,
            url: this.url.value,
            mime: this.mime.value,
            extension: this.extension.value,
            size: this.size.value,
            width: this.width?.value,
            height: this.height?.value,
            meta: this.meta?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,
        };
    }
}
