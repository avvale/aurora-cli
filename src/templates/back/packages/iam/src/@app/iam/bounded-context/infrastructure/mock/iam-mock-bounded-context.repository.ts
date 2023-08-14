import { Injectable } from '@nestjs/common';
import { MockRepository, Utils } from '@aurorajs.dev/core';
import { IamIBoundedContextRepository } from '@app/iam/bounded-context/domain/iam-bounded-context.repository';
import {
    IamBoundedContextId,
    IamBoundedContextName,
    IamBoundedContextRoot,
    IamBoundedContextSort,
    IamBoundedContextIsActive,
    IamBoundedContextCreatedAt,
    IamBoundedContextUpdatedAt,
    IamBoundedContextDeletedAt,
} from '@app/iam/bounded-context/domain/value-objects';
import { IamBoundedContext } from '../../domain/iam-bounded-context.aggregate';
import { iamMockBoundedContextData } from './iam-mock-bounded-context.data';

@Injectable()
export class IamMockBoundedContextRepository extends MockRepository<IamBoundedContext> implements IamIBoundedContextRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'IamBoundedContext';
    public collectionSource: IamBoundedContext[];
    public deletedAtInstance: IamBoundedContextDeletedAt = new IamBoundedContextDeletedAt(null);

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

        for (const itemCollection of <any[]>iamMockBoundedContextData)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push(IamBoundedContext.register(
                new IamBoundedContextId(itemCollection.id),
                new IamBoundedContextName(itemCollection.name),
                new IamBoundedContextRoot(itemCollection.root),
                new IamBoundedContextSort(itemCollection.sort),
                new IamBoundedContextIsActive(itemCollection.isActive),
                new IamBoundedContextCreatedAt(itemCollection.createdAt),
                new IamBoundedContextUpdatedAt(itemCollection.updatedAt),
                new IamBoundedContextDeletedAt(itemCollection.deletedAt),
            ));
        }
    }
}
