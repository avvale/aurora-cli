import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';

export class FindApplicationByAuthorizationHeaderQuery
{
    constructor(
        public readonly authorizationHeader: string,
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
