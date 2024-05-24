import { IamDeletedTagEvent } from '@app/iam/tag';
import { CQMetadata } from '@aurorajs.dev/core';

export class IamDeletedTagsEvent
{
    constructor(
        public readonly event: {
            payload: IamDeletedTagEvent[];
            cQMetadata?: CQMetadata;
        },
    ) {}
}
