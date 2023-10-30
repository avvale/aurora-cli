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
    CommonAttachmentIsCropable,
    CommonAttachmentLibraryFilename,
    CommonAttachmentLibraryId,
    CommonAttachmentMeta,
    CommonAttachmentMimetype,
    CommonAttachmentRelativePathSegments,
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
    filename: CommonAttachmentFilename;
    mimetype: CommonAttachmentMimetype;
    extension: CommonAttachmentExtension;
    relativePathSegments: CommonAttachmentRelativePathSegments;
    width: CommonAttachmentWidth;
    height: CommonAttachmentHeight;
    size: CommonAttachmentSize;
    url: CommonAttachmentUrl;
    isCropable: CommonAttachmentIsCropable;
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
        filename: CommonAttachmentFilename,
        mimetype: CommonAttachmentMimetype,
        extension: CommonAttachmentExtension,
        relativePathSegments: CommonAttachmentRelativePathSegments,
        width: CommonAttachmentWidth,
        height: CommonAttachmentHeight,
        size: CommonAttachmentSize,
        url: CommonAttachmentUrl,
        isCropable: CommonAttachmentIsCropable,
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
        this.filename = filename;
        this.mimetype = mimetype;
        this.extension = extension;
        this.relativePathSegments = relativePathSegments;
        this.width = width;
        this.height = height;
        this.size = size;
        this.url = url;
        this.isCropable = isCropable;
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
        filename: CommonAttachmentFilename,
        mimetype: CommonAttachmentMimetype,
        extension: CommonAttachmentExtension,
        relativePathSegments: CommonAttachmentRelativePathSegments,
        width: CommonAttachmentWidth,
        height: CommonAttachmentHeight,
        size: CommonAttachmentSize,
        url: CommonAttachmentUrl,
        isCropable: CommonAttachmentIsCropable,
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
            filename,
            mimetype,
            extension,
            relativePathSegments,
            width,
            height,
            size,
            url,
            isCropable,
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
                attachment.alt?.value,
                attachment.title?.value,
                attachment.filename.value,
                attachment.mimetype.value,
                attachment.extension.value,
                attachment.relativePathSegments.value,
                attachment.width?.value,
                attachment.height?.value,
                attachment.size.value,
                attachment.url.value,
                attachment.isCropable.value,
                attachment.libraryId?.value,
                attachment.libraryFilename?.value,
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
                attachment.filename?.value,
                attachment.mimetype?.value,
                attachment.extension?.value,
                attachment.relativePathSegments?.value,
                attachment.width?.value,
                attachment.height?.value,
                attachment.size?.value,
                attachment.url?.value,
                attachment.isCropable?.value,
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
                attachment.alt?.value,
                attachment.title?.value,
                attachment.filename.value,
                attachment.mimetype.value,
                attachment.extension.value,
                attachment.relativePathSegments.value,
                attachment.width?.value,
                attachment.height?.value,
                attachment.size.value,
                attachment.url.value,
                attachment.isCropable.value,
                attachment.libraryId?.value,
                attachment.libraryFilename?.value,
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
            alt: this.alt?.value,
            title: this.title?.value,
            filename: this.filename.value,
            mimetype: this.mimetype.value,
            extension: this.extension.value,
            relativePathSegments: this.relativePathSegments.value,
            width: this.width?.value,
            height: this.height?.value,
            size: this.size.value,
            url: this.url.value,
            isCropable: this.isCropable.value,
            libraryId: this.libraryId?.value,
            libraryFilename: this.libraryFilename?.value,
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
            alt: this.alt?.value,
            title: this.title?.value,
            filename: this.filename.value,
            mimetype: this.mimetype.value,
            extension: this.extension.value,
            relativePathSegments: this.relativePathSegments.value,
            width: this.width?.value,
            height: this.height?.value,
            size: this.size.value,
            url: this.url.value,
            isCropable: this.isCropable.value,
            libraryId: this.libraryId?.value,
            libraryFilename: this.libraryFilename?.value,
            meta: this.meta?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,
            family: this.family?.toDTO(),
            library: this.library?.toDTO(),
        };
    }
}
