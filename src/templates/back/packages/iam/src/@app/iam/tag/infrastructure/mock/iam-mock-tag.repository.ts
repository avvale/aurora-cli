import { IamITagRepository, iamMockTagData, IamTag } from '@app/iam/tag';
import {
    IamTagCreatedAt,
    IamTagDeletedAt,
    IamTagId,
    IamTagName,
    IamTagUpdatedAt,
} from '@app/iam/tag/domain/value-objects';
import { MockRepository, Utils } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamMockTagRepository extends MockRepository<IamTag> implements IamITagRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'IamTag';
    public collectionSource: IamTag[];

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

        for (const itemCollection of <any[]>iamMockTagData)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push(IamTag.register(
                new IamTagId(itemCollection.id),
                new IamTagName(itemCollection.name),
                new IamTagCreatedAt(itemCollection.createdAt),
                new IamTagUpdatedAt(itemCollection.updatedAt),
                new IamTagDeletedAt(itemCollection.deletedAt),
            ));
        }
    }
}
