import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';

export class FindAdministrativeAreaLevel3Query
{
    constructor(
        public readonly queryStatement?: QueryStatement,
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}