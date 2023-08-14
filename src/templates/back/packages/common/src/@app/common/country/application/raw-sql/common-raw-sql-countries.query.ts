import { CQMetadata } from '@aurorajs.dev/core';

export class CommonRawSQLCountriesQuery
{
    constructor(
        public readonly rawSQL?: string,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
