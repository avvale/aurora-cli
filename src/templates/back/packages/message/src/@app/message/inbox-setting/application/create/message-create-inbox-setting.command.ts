import { CQMetadata } from '@aurorajs.dev/core';

export class MessageCreateInboxSettingCommand
{
    constructor(
        public readonly payload: {
            id: string;
            accountId: string;
            sort: number;
        },
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
