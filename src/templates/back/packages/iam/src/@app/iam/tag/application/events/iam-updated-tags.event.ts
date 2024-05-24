import { IamUpdatedTagEvent } from '@app/iam/tag';
import { CQMetadata } from '@aurorajs.dev/core';

export class IamUpdatedTagsEvent
{
    constructor(
        public readonly event: {
            payload: IamUpdatedTagEvent[];
            cQMetadata?: CQMetadata;
        },
    ) {}
}
