import { IamUpdatedAndIncrementedTagEvent } from '@app/iam/tag';
import { CQMetadata } from '@aurorajs.dev/core';

export class IamUpdatedAndIncrementedTagsEvent
{
    constructor(
        public readonly event: {
            payload: IamUpdatedAndIncrementedTagEvent[];
            cQMetadata?: CQMetadata;
        },
    ) {}
}
