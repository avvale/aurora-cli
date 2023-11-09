import { CommonAttachment, commonMockAttachmentData } from '@app/common/attachment';
import {
    CommonAttachmentAlt,
    CommonAttachmentAttachableId,
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
    CommonAttachmentOriginFilename,
    CommonAttachmentRelativePathSegments,
    CommonAttachmentSize,
    CommonAttachmentSizes,
    CommonAttachmentSort,
    CommonAttachmentTitle,
    CommonAttachmentUpdatedAt,
    CommonAttachmentUrl,
    CommonAttachmentWidth,
} from '@app/common/attachment/domain/value-objects';
import { MockSeeder } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';

@Injectable()
export class CommonMockAttachmentSeeder extends MockSeeder<CommonAttachment>
{
    public collectionSource: CommonAttachment[];

    constructor()
    {
        super();
        this._createMock();
    }

    private _createMock(): void
    {
        this.collectionSource = [];

        for (const attachment of _.orderBy(commonMockAttachmentData, ['id']))
        {
            this.collectionSource.push(
                CommonAttachment.register(
                    new CommonAttachmentId(attachment.id),
                    new CommonAttachmentFamilyId(attachment.familyId),
                    new CommonAttachmentAttachableId(attachment.attachableId),
                    new CommonAttachmentSort(attachment.sort),
                    new CommonAttachmentAlt(attachment.alt),
                    new CommonAttachmentTitle(attachment.title),
                    new CommonAttachmentOriginFilename(attachment.originFilename),
                    new CommonAttachmentFilename(attachment.filename),
                    new CommonAttachmentMimetype(attachment.mimetype),
                    new CommonAttachmentExtension(attachment.extension),
                    new CommonAttachmentRelativePathSegments(attachment.relativePathSegments),
                    new CommonAttachmentWidth(attachment.width),
                    new CommonAttachmentHeight(attachment.height),
                    new CommonAttachmentSize(attachment.size),
                    new CommonAttachmentUrl(attachment.url),
                    new CommonAttachmentIsCropable(attachment.isCropable),
                    new CommonAttachmentLibraryId(attachment.libraryId),
                    new CommonAttachmentLibraryFilename(attachment.libraryFilename),
                    new CommonAttachmentSizes(attachment.sizes),
                    new CommonAttachmentMeta(attachment.meta),
                    new CommonAttachmentCreatedAt({ currentTimestamp: true }),
                    new CommonAttachmentUpdatedAt({ currentTimestamp: true }),
                    new CommonAttachmentDeletedAt(null),
                ),
            );
        }
    }
}
