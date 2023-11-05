import { CommonAttachmentLibrary, CommonIAttachmentLibraryRepository, commonMockAttachmentLibraryData } from '@app/common/attachment-library';
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
import { MockRepository, Utils } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonMockAttachmentLibraryRepository extends MockRepository<CommonAttachmentLibrary> implements CommonIAttachmentLibraryRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'CommonAttachmentLibrary';
    public collectionSource: CommonAttachmentLibrary[];

    constructor()
    {
        super();
        this.createSourceMockData();
    }

    public reset(): void
    {
        this.createSourceMockData();
    }

    private createSourceMockData(): void
    {
        this.collectionSource = [];
        const now = Utils.nowTimestamp();

        for (const itemCollection of <any[]>commonMockAttachmentLibraryData)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push(CommonAttachmentLibrary.register(
                new CommonAttachmentLibraryId(itemCollection.id),
                new CommonAttachmentLibraryFilename(itemCollection.filename),
                new CommonAttachmentLibraryMimetype(itemCollection.mimetype),
                new CommonAttachmentLibraryExtension(itemCollection.extension),
                new CommonAttachmentLibraryRelativePathSegments(itemCollection.relativePathSegments),
                new CommonAttachmentLibraryWidth(itemCollection.width),
                new CommonAttachmentLibraryHeight(itemCollection.height),
                new CommonAttachmentLibrarySize(itemCollection.size),
                new CommonAttachmentLibraryUrl(itemCollection.url),
                new CommonAttachmentLibraryMeta(itemCollection.meta),
                new CommonAttachmentLibraryCreatedAt(itemCollection.createdAt),
                new CommonAttachmentLibraryUpdatedAt(itemCollection.updatedAt),
                new CommonAttachmentLibraryDeletedAt(itemCollection.deletedAt),
            ));
        }
    }
}
