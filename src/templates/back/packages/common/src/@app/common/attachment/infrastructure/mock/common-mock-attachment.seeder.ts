import { CommonAttachment, commonMockAttachmentData } from '@app/common/attachment';
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
                    new CommonAttachmentSort(attachment.sort),
                    new CommonAttachmentAlt(attachment.alt),
                    new CommonAttachmentTitle(attachment.title),
                    new CommonAttachmentPath(attachment.path),
                    new CommonAttachmentFilename(attachment.filename),
                    new CommonAttachmentUrl(attachment.url),
                    new CommonAttachmentMime(attachment.mime),
                    new CommonAttachmentExtension(attachment.extension),
                    new CommonAttachmentSize(attachment.size),
                    new CommonAttachmentWidth(attachment.width),
                    new CommonAttachmentHeight(attachment.height),
                    new CommonAttachmentLibraryId(attachment.libraryId),
                    new CommonAttachmentLibraryFilename(attachment.libraryFilename),
                    new CommonAttachmentMeta(attachment.meta),
                    new CommonAttachmentCreatedAt({ currentTimestamp: true }),
                    new CommonAttachmentUpdatedAt({ currentTimestamp: true }),
                    new CommonAttachmentDeletedAt(null),
                ),
            );
        }
    }
}
