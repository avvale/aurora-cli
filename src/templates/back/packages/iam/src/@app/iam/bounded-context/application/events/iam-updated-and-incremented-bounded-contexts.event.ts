import { IamUpdatedAndIncrementedBoundedContextEvent } from '@app/iam/bounded-context';
import { CQMetadata } from '@aurorajs.dev/core';

export class IamUpdatedAndIncrementedBoundedContextsEvent
{
    constructor(
        public readonly event: {
            payload: IamUpdatedAndIncrementedBoundedContextEvent[];
            cQMetadata?: CQMetadata;
        },
    ) {}
}
