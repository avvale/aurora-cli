import { CQMetadata } from '@aurorajs.dev/core';

export class RawSQLCountriesQuery
{
    constructor(
        public readonly rawSQL?: string,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}