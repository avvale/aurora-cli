import { CQMetadata } from '@aurorajs.dev/core';

export class MessageCreateInboxSettingsCommand
{
    constructor(
        public readonly payload: {
            id: string;
            accountId: string;
            sort: number;
        } [],
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
