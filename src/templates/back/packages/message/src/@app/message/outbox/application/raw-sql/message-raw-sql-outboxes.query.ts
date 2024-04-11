import { CQMetadata } from '@aurorajs.dev/core';

export class MessageRawSQLOutboxesQuery
{
    constructor(
        public readonly rawSQL?: string,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
