import { Injectable } from '@nestjs/common';
import { MockSeeder } from '@aurorajs.dev/core';
import {
    IamBoundedContextId,
    IamBoundedContextName,
    IamBoundedContextRoot,
    IamBoundedContextSort,
    IamBoundedContextIsActive,
    IamBoundedContextCreatedAt,
    IamBoundedContextUpdatedAt,
    IamBoundedContextDeletedAt,
} from '../../domain/value-objects';
import { IamBoundedContext } from '../../domain/iam-bounded-context.aggregate';
import { iamMockBoundedContextData } from './iam-mock-bounded-context.data';
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
