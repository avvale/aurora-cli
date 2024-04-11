import { CQMetadata } from '@aurorajs.dev/core';

export class MessageUpsertInboxSettingCommand
{
    constructor(
        public readonly payload: {
            id: string;
            accountId?: string;
            sort?: number;
        },
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
