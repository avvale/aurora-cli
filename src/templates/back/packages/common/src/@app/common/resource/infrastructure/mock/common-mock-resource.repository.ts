import { Injectable } from '@nestjs/common';
import { MockRepository, Utils } from '@aurorajs.dev/core';
import { CommonIResourceRepository } from '@app/common/resource/domain/common-resource.repository';
import {
    CommonResourceId,
    CommonResourceCode,
    CommonResourceName,
    CommonResourceIsActive,
    CommonResourceHasAttachments,
    CommonResourceCreatedAt,
    CommonResourceUpdatedAt,
    CommonResourceDeletedAt,
} from '@app/common/resource/domain/value-objects';
import { CommonResource } from '../../domain/common-resource.aggregate';
import { commonMockResourceData } from './common-mock-resource.data';

@Injectable()
export class CommonMockResourceRepository extends MockRepository<CommonResource> implements CommonIResourceRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'CommonResource';
    public collectionSource: CommonResource[];
    public deletedAtInstance: CommonResourceDeletedAt = new CommonResourceDeletedAt(null);

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

        for (const itemCollection of <any[]>commonMockResourceData)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push(CommonResource.register(
                new CommonResourceId(itemCollection.id),
                new CommonResourceCode(itemCollection.code),
                new CommonResourceName(itemCollection.name),
                new CommonResourceIsActive(itemCollection.isActive),
                new CommonResourceHasAttachments(itemCollection.hasAttachments),
                new CommonResourceCreatedAt(itemCollection.createdAt),
                new CommonResourceUpdatedAt(itemCollection.updatedAt),
                new CommonResourceDeletedAt(itemCollection.deletedAt),
            ));
        }
    }
}
