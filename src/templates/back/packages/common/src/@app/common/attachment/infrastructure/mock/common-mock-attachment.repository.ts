import { CommonAttachment, CommonIAttachmentRepository, commonMockAttachmentData } from '@app/common/attachment';
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
import { MockRepository, Utils } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonMockAttachmentRepository extends MockRepository<CommonAttachment> implements CommonIAttachmentRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'CommonAttachment';
    public collectionSource: CommonAttachment[];

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

        for (const itemCollection of <any[]>commonMockAttachmentData)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push(CommonAttachment.register(
                new CommonAttachmentId(itemCollection.id),
                new CommonAttachmentFamilyId(itemCollection.familyId),
                new CommonAttachmentSort(itemCollection.sort),
                new CommonAttachmentAlt(itemCollection.alt),
                new CommonAttachmentTitle(itemCollection.title),
                new CommonAttachmentPath(itemCollection.path),
                new CommonAttachmentFilename(itemCollection.filename),
                new CommonAttachmentUrl(itemCollection.url),
                new CommonAttachmentMime(itemCollection.mime),
                new CommonAttachmentExtension(itemCollection.extension),
                new CommonAttachmentSize(itemCollection.size),
                new CommonAttachmentWidth(itemCollection.width),
                new CommonAttachmentHeight(itemCollection.height),
                new CommonAttachmentLibraryId(itemCollection.libraryId),
                new CommonAttachmentLibraryFilename(itemCollection.libraryFilename),
                new CommonAttachmentMeta(itemCollection.meta),
                new CommonAttachmentCreatedAt(itemCollection.createdAt),
                new CommonAttachmentUpdatedAt(itemCollection.updatedAt),
                new CommonAttachmentDeletedAt(itemCollection.deletedAt),
            ));
        }
    }
}
