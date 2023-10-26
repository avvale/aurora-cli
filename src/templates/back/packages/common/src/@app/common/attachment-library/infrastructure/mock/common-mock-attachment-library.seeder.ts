import { CommonAttachmentLibrary, commonMockAttachmentLibraryData } from '@app/common/attachment-library';
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
                    new CommonAttachmentLibraryName(attachmentLibrary.name),
                    new CommonAttachmentLibraryPath(attachmentLibrary.path),
                    new CommonAttachmentLibraryFilename(attachmentLibrary.filename),
                    new CommonAttachmentLibraryUrl(attachmentLibrary.url),
                    new CommonAttachmentLibraryMime(attachmentLibrary.mime),
                    new CommonAttachmentLibraryExtension(attachmentLibrary.extension),
                    new CommonAttachmentLibrarySize(attachmentLibrary.size),
                    new CommonAttachmentLibraryWidth(attachmentLibrary.width),
                    new CommonAttachmentLibraryHeight(attachmentLibrary.height),
                    new CommonAttachmentLibraryMeta(attachmentLibrary.meta),
                    new CommonAttachmentLibraryCreatedAt({ currentTimestamp: true }),
                    new CommonAttachmentLibraryUpdatedAt({ currentTimestamp: true }),
                    new CommonAttachmentLibraryDeletedAt(null),
                ),
            );
        }
    }
}
