import { Injectable } from '@nestjs/common';
import { MockRepository, Utils } from '@aurorajs.dev/core';
import { CommonIAttachmentFamilyRepository } from '@app/common/attachment-family/domain/common-attachment-family.repository';
import {
    CommonAttachmentFamilyId,
    CommonAttachmentFamilyResourceId,
    CommonAttachmentFamilyName,
    CommonAttachmentFamilyWidth,
    CommonAttachmentFamilyHeight,
    CommonAttachmentFamilyFitType,
    CommonAttachmentFamilyQuality,
    CommonAttachmentFamilySizes,
    CommonAttachmentFamilyFormat,
    CommonAttachmentFamilyCreatedAt,
    CommonAttachmentFamilyUpdatedAt,
    CommonAttachmentFamilyDeletedAt,
} from '@app/common/attachment-family/domain/value-objects';
import { CommonAttachmentFamily } from '../../domain/common-attachment-family.aggregate';
import { commonMockAttachmentFamilyData } from './common-mock-attachment-family.data';

@Injectable()
export class CommonMockAttachmentFamilyRepository extends MockRepository<CommonAttachmentFamily> implements CommonIAttachmentFamilyRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'CommonAttachmentFamily';
    public collectionSource: CommonAttachmentFamily[];

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

        for (const itemCollection of <any[]>commonMockAttachmentFamilyData)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push(CommonAttachmentFamily.register(
                new CommonAttachmentFamilyId(itemCollection.id),
                new CommonAttachmentFamilyResourceId(itemCollection.resourceId),
                new CommonAttachmentFamilyName(itemCollection.name),
                new CommonAttachmentFamilyWidth(itemCollection.width),
                new CommonAttachmentFamilyHeight(itemCollection.height),
                new CommonAttachmentFamilyFitType(itemCollection.fitType),
                new CommonAttachmentFamilyQuality(itemCollection.quality),
                new CommonAttachmentFamilySizes(itemCollection.sizes),
                new CommonAttachmentFamilyFormat(itemCollection.format),
                new CommonAttachmentFamilyCreatedAt(itemCollection.createdAt),
                new CommonAttachmentFamilyUpdatedAt(itemCollection.updatedAt),
                new CommonAttachmentFamilyDeletedAt(itemCollection.deletedAt),
            ));
        }
    }
}
