import { IamBoundedContext, iamMockBoundedContextData } from '@app/iam/bounded-context';
import {
    IamBoundedContextCreatedAt,
    IamBoundedContextDeletedAt,
    IamBoundedContextId,
    IamBoundedContextIsActive,
    IamBoundedContextName,
    IamBoundedContextRoot,
    IamBoundedContextSort,
    IamBoundedContextUpdatedAt,
} from '@app/iam/bounded-context/domain/value-objects';
import { MockSeeder } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';

@Injectable()
export class IamMockBoundedContextSeeder extends MockSeeder<IamBoundedContext>
{
    public collectionSource: IamBoundedContext[];

    constructor()
    {
        super();
        this._createMock();
    }

    private _createMock(): void
    {
        this.collectionSource = [];

        for (const boundedContext of _.orderBy(iamMockBoundedContextData, ['id']))
        {
            this.collectionSource.push(
                IamBoundedContext.register(
                    new IamBoundedContextId(boundedContext.id),
                    new IamBoundedContextName(boundedContext.name),
                    new IamBoundedContextRoot(boundedContext.root),
                    new IamBoundedContextSort(boundedContext.sort),
                    new IamBoundedContextIsActive(boundedContext.isActive),
                    new IamBoundedContextCreatedAt({ currentTimestamp: true }),
                    new IamBoundedContextUpdatedAt({ currentTimestamp: true }),
                    new IamBoundedContextDeletedAt(null),
                ),
            );
        }
    }
}
