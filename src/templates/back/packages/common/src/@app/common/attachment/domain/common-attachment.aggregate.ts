/* eslint-disable key-spacing */
import { CommonCreatedAttachmentEvent, CommonDeletedAttachmentEvent, CommonUpdatedAttachmentEvent } from '@app/common/attachment';
import { CommonAttachmentFamily } from '@app/common/attachment-family';
import { CommonAttachmentLibrary } from '@app/common/attachment-library';
import {
    CommonAttachmentAlt,
    CommonAttachmentCreatedAt,
    CommonAttachmentDeletedAt,
    CommonAttachmentExtension,
    CommonAttachmentFamilyId,
    CommonAttachmentFilename,
    CommonAttachmentHeight,
    CommonAttachmentId,
    CommonAttachmentLibraryFilename,
    CommonAttachmentLibraryId,
    CommonAttachmentMeta,
    CommonAttachmentMime,
    CommonAttachmentPath,
    CommonAttachmentSize,
    CommonAttachmentSort,
    CommonAttachmentTitle,
    CommonAttachmentUpdatedAt,
    CommonAttachmentUrl,
    CommonAttachmentWidth,
} from '@app/common/attachment/domain/value-objects';
import { LiteralObject, Utils } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

export class CommonAttachment extends AggregateRoot
{
    id: CommonAttachmentId;
    familyId: CommonAttachmentFamilyId;
    sort: CommonAttachmentSort;
    alt: CommonAttachmentAlt;
    title: CommonAttachmentTitle;
    path: CommonAttachmentPath;
    filename: CommonAttachmentFilename;
    url: CommonAttachmentUrl;
    mime: CommonAttachmentMime;
    extension: CommonAttachmentExtension;
    size: CommonAttachmentSize;
    width: CommonAttachmentWidth;
    height: CommonAttachmentHeight;
    libraryId: CommonAttachmentLibraryId;
    libraryFilename: CommonAttachmentLibraryFilename;
    meta: CommonAttachmentMeta;
    createdAt: CommonAttachmentCreatedAt;
    updatedAt: CommonAttachmentUpdatedAt;
    deletedAt: CommonAttachmentDeletedAt;
    family: CommonAttachmentFamily;
    library: CommonAttachmentLibrary;

    constructor(
        id: CommonAttachmentId,
        familyId: CommonAttachmentFamilyId,
        sort: CommonAttachmentSort,
        alt: CommonAttachmentAlt,
        title: CommonAttachmentTitle,
        path: CommonAttachmentPath,
        filename: CommonAttachmentFilename,
        url: CommonAttachmentUrl,
        mime: CommonAttachmentMime,
        extension: CommonAttachmentExtension,
        size: CommonAttachmentSize,
        width: CommonAttachmentWidth,
        height: CommonAttachmentHeight,
        libraryId: CommonAttachmentLibraryId,
        libraryFilename: CommonAttachmentLibraryFilename,
        meta: CommonAttachmentMeta,
        createdAt: CommonAttachmentCreatedAt,
        updatedAt: CommonAttachmentUpdatedAt,
        deletedAt: CommonAttachmentDeletedAt,
        family?: CommonAttachmentFamily,
        library?: CommonAttachmentLibrary,
    )
    {
        super();
        this.id = id;
        this.familyId = familyId;
        this.sort = sort;
        this.alt = alt;
        this.title = title;
        this.path = path;
        this.filename = filename;
        this.url = url;
        this.mime = mime;
        this.extension = extension;
        this.size = size;
        this.width = width;
        this.height = height;
        this.libraryId = libraryId;
        this.libraryFilename = libraryFilename;
        this.meta = meta;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
        this.family = family;
        this.library = library;
    }

    static register(
        id: CommonAttachmentId,
        familyId: CommonAttachmentFamilyId,
        sort: CommonAttachmentSort,
        alt: CommonAttachmentAlt,
        title: CommonAttachmentTitle,
        path: CommonAttachmentPath,
        filename: CommonAttachmentFilename,
        url: CommonAttachmentUrl,
        mime: CommonAttachmentMime,
        extension: CommonAttachmentExtension,
        size: CommonAttachmentSize,
        width: CommonAttachmentWidth,
        height: CommonAttachmentHeight,
        libraryId: CommonAttachmentLibraryId,
        libraryFilename: CommonAttachmentLibraryFilename,
        meta: CommonAttachmentMeta,
        createdAt: CommonAttachmentCreatedAt,
        updatedAt: CommonAttachmentUpdatedAt,
        deletedAt: CommonAttachmentDeletedAt,
        family?: CommonAttachmentFamily,
        library?: CommonAttachmentLibrary,
    ): CommonAttachment
    {
        return new CommonAttachment(
            id,
            familyId,
            sort,
            alt,
            title,
            path,
            filename,
            url,
            mime,
            extension,
            size,
            width,
            height,
            libraryId,
            libraryFilename,
            meta,
            createdAt,
            updatedAt,
            deletedAt,
            family,
            library,
        );
    }

    created(attachment: CommonAttachment): void
    {
        this.apply(
            new CommonCreatedAttachmentEvent(
                attachment.id.value,
                attachment.familyId?.value,
                attachment.sort?.value,
                attachment.alt.value,
                attachment.title.value,
                attachment.path.value,
                attachment.filename.value,
                attachment.url.value,
                attachment.mime.value,
                attachment.extension.value,
                attachment.size.value,
                attachment.width?.value,
                attachment.height?.value,
                attachment.libraryId?.value,
                attachment.libraryFilename.value,
                attachment.meta?.value,
                attachment.createdAt?.value,
                attachment.updatedAt?.value,
                attachment.deletedAt?.value,
            ),
        );
    }

    updated(attachment: CommonAttachment): void
    {
        this.apply(
            new CommonUpdatedAttachmentEvent(
                attachment.id?.value,
                attachment.familyId?.value,
                attachment.sort?.value,
                attachment.alt?.value,
                attachment.title?.value,
                attachment.path?.value,
                attachment.filename?.value,
                attachment.url?.value,
                attachment.mime?.value,
                attachment.extension?.value,
                attachment.size?.value,
                attachment.width?.value,
                attachment.height?.value,
                attachment.libraryId?.value,
                attachment.libraryFilename?.value,
                attachment.meta?.value,
                attachment.createdAt?.value,
                attachment.updatedAt?.value,
                attachment.deletedAt?.value,
            ),
        );
    }

    deleted(attachment: CommonAttachment): void
    {
        this.apply(
            new CommonDeletedAttachmentEvent(
                attachment.id.value,
                attachment.familyId?.value,
                attachment.sort?.value,
                attachment.alt.value,
                attachment.title.value,
                attachment.path.value,
                attachment.filename.value,
                attachment.url.value,
                attachment.mime.value,
                attachment.extension.value,
                attachment.size.value,
                attachment.width?.value,
                attachment.height?.value,
                attachment.libraryId?.value,
                attachment.libraryFilename.value,
                attachment.meta?.value,
                attachment.createdAt?.value,
                attachment.updatedAt?.value,
                attachment.deletedAt?.value,
            ),
        );
    }

    toDTO(): LiteralObject
    {
        return {
            id: this.id.value,
            familyId: this.familyId?.value,
            sort: this.sort?.value,
            alt: this.alt.value,
            title: this.title.value,
            path: this.path.value,
            filename: this.filename.value,
            url: this.url.value,
            mime: this.mime.value,
            extension: this.extension.value,
            size: this.size.value,
            width: this.width?.value,
            height: this.height?.value,
            libraryId: this.libraryId?.value,
            libraryFilename: this.libraryFilename.value,
            meta: this.meta?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,
            family: this.family?.toDTO(),
            library: this.library?.toDTO(),
        };
    }

    // function called to get data for repository side effect methods
    toRepository(): LiteralObject
    {
        return {
            id: this.id.value,
            familyId: this.familyId?.value,
            sort: this.sort?.value,
            alt: this.alt.value,
            title: this.title.value,
            path: this.path.value,
            filename: this.filename.value,
            url: this.url.value,
            mime: this.mime.value,
            extension: this.extension.value,
            size: this.size.value,
            width: this.width?.value,
            height: this.height?.value,
            libraryId: this.libraryId?.value,
            libraryFilename: this.libraryFilename.value,
            meta: this.meta?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,
            family: this.family?.toDTO(),
            library: this.library?.toDTO(),
        };
    }
}
