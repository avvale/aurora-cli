import { Injectable } from '@nestjs/common';
import { MockRepository, Utils } from 'aurora-ts-core';
import { IBoundedContextRepository } from '../../../../../@apps/iam/bounded-context/domain/bounded-context.repository';
import {
    BoundedContextId,
    BoundedContextName,
    BoundedContextRoot,
    BoundedContextSort,
    BoundedContextIsActive,
    BoundedContextCreatedAt,
    BoundedContextUpdatedAt,
    BoundedContextDeletedAt,
} from '../../../../../@apps/iam/bounded-context/domain/value-objects';
import { IamBoundedContext } from '../../domain/bounded-context.aggregate';
import { boundedContexts } from '../seeds/bounded-context.seed';

@Injectable()
export class MockBoundedContextRepository extends MockRepository<IamBoundedContext> implements IBoundedContextRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'IamBoundedContext';
    public collectionSource: IamBoundedContext[];
    public deletedAtInstance: BoundedContextDeletedAt = new BoundedContextDeletedAt(null);

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

        for (const itemCollection of <any[]>boundedContexts)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push(IamBoundedContext.register(
                new BoundedContextId(itemCollection.id),
                new BoundedContextName(itemCollection.name),
                new BoundedContextRoot(itemCollection.root),
                new BoundedContextSort(itemCollection.sort),
                new BoundedContextIsActive(itemCollection.isActive),
                new BoundedContextCreatedAt(itemCollection.createdAt),
                new BoundedContextUpdatedAt(itemCollection.updatedAt),
                new BoundedContextDeletedAt(itemCollection.deletedAt),
            ));
        }
    }
}