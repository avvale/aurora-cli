import { IamCreatedBoundedContextEvent } from '@app/iam/bounded-context';
import { CQMetadata } from '@aurorajs.dev/core';

export class IamCreatedBoundedContextsEvent
{
    constructor(
        public readonly event: {
            payload: IamCreatedBoundedContextEvent[];
            cQMetadata?: CQMetadata;
        },
    ) {}
}
