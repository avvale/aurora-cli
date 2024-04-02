import { IamDeletedTagEvent } from './iam-deleted-tag.event';

export class IamDeletedTagsEvent
{
    constructor(
        public readonly tags: IamDeletedTagEvent[],
    ) {}
}
