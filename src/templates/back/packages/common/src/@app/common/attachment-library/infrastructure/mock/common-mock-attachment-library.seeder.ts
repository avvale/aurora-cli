import { CommonAttachmentLibrary, commonMockAttachmentLibraryData } from '@app/common/attachment-library';
import {
    CommonAttachmentLibraryCreatedAt,
    CommonAttachmentLibraryDeletedAt,
    CommonAttachmentLibraryExtension,
    CommonAttachmentLibraryFilename,
    CommonAttachmentLibraryHeight,
    CommonAttachmentLibraryId,
    CommonAttachmentLibraryMeta,
    CommonAttachmentLibraryMimetype,
    CommonAttachmentLibraryOriginFilename,
    CommonAttachmentLibraryRelativePathSegments,
    CommonAttachmentLibrarySize,
    CommonAttachmentLibraryUpdatedAt,
    CommonAttachmentLibraryUrl,
    CommonAttachmentLibraryWidth,
} from '@app/common/attachment-library/domain/value-objects';
import { MockSeeder } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';

@Injectable()
export class CommonMockAttachmentLibrarySeeder extends MockSeeder<CommonAttachmentLibrary>
{
    public collectionSource: CommonAttachmentLibrary[];

    constructor()
    {
        super();
        this._createMock();
    }

    private _createMock(): void
    {
        this.collectionSource = [];

        for (const attachmentLibrary of _.orderBy(commonMockAttachmentLibraryData, ['id']))
        {
            this.collectionSource.push(
                CommonAttachmentLibrary.register(
                    new CommonAttachmentLibraryId(attachmentLibrary.id),
                    new CommonAttachmentLibraryFilename(attachmentLibrary.filename),
                    new CommonAttachmentLibraryOriginFilename(attachmentLibrary.originFilename),
                    new CommonAttachmentLibraryMimetype(attachmentLibrary.mimetype),
                    new CommonAttachmentLibraryExtension(attachmentLibrary.extension),
                    new CommonAttachmentLibraryRelativePathSegments(attachmentLibrary.relativePathSegments),
                    new CommonAttachmentLibraryWidth(attachmentLibrary.width),
                    new CommonAttachmentLibraryHeight(attachmentLibrary.height),
                    new CommonAttachmentLibrarySize(attachmentLibrary.size),
                    new CommonAttachmentLibraryUrl(attachmentLibrary.url),
                    new CommonAttachmentLibraryMeta(attachmentLibrary.meta),
                    new CommonAttachmentLibraryCreatedAt({ currentTimestamp: true }),
                    new CommonAttachmentLibraryUpdatedAt({ currentTimestamp: true }),
                    new CommonAttachmentLibraryDeletedAt(null),
                ),
            );
        }
    }
}
