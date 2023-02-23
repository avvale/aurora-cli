import { CQMetadata, QueryStatement } from '@aurora-ts/core';

export class FindApplicationByAuthorizationHeaderQuery
{
    constructor(
        public readonly authorizationHeader: string,
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
