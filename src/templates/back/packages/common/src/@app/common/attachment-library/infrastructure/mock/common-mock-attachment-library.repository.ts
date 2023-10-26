import { CommonAttachmentLibrary, CommonIAttachmentLibraryRepository, commonMockAttachmentLibraryData } from '@app/common/attachment-library';
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
                new CommonAttachmentLibraryName(itemCollection.name),
                new CommonAttachmentLibraryPath(itemCollection.path),
                new CommonAttachmentLibraryFilename(itemCollection.filename),
                new CommonAttachmentLibraryUrl(itemCollection.url),
                new CommonAttachmentLibraryMime(itemCollection.mime),
                new CommonAttachmentLibraryExtension(itemCollection.extension),
                new CommonAttachmentLibrarySize(itemCollection.size),
                new CommonAttachmentLibraryWidth(itemCollection.width),
                new CommonAttachmentLibraryHeight(itemCollection.height),
                new CommonAttachmentLibraryMeta(itemCollection.meta),
                new CommonAttachmentLibraryCreatedAt(itemCollection.createdAt),
                new CommonAttachmentLibraryUpdatedAt(itemCollection.updatedAt),
                new CommonAttachmentLibraryDeletedAt(itemCollection.deletedAt),
            ));
        }
    }
}
