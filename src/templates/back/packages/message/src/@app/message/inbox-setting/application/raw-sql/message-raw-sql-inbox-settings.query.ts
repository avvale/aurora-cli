import { CQMetadata } from '@aurorajs.dev/core';

export class MessageRawSQLInboxSettingsQuery
{
    constructor(
        public readonly rawSQL?: string,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
