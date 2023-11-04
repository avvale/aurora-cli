import { CommonAttachment, CommonIAttachmentRepository, commonMockAttachmentData } from '@app/common/attachment';
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
    CommonAttachmentRelativePathSegments,
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
                new CommonAttachmentAttachableId(itemCollection.attachableId),
                new CommonAttachmentSort(itemCollection.sort),
                new CommonAttachmentAlt(itemCollection.alt),
                new CommonAttachmentTitle(itemCollection.title),
                new CommonAttachmentFilename(itemCollection.filename),
                new CommonAttachmentMimetype(itemCollection.mimetype),
                new CommonAttachmentExtension(itemCollection.extension),
                new CommonAttachmentRelativePathSegments(itemCollection.relativePathSegments),
                new CommonAttachmentWidth(itemCollection.width),
                new CommonAttachmentHeight(itemCollection.height),
                new CommonAttachmentSize(itemCollection.size),
                new CommonAttachmentUrl(itemCollection.url),
                new CommonAttachmentIsCropable(itemCollection.isCropable),
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
