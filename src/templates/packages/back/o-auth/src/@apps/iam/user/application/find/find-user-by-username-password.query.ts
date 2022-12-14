import { CQMetadata, QueryStatement } from '@aurora-ts/core';

export class FindUserByUsernamePasswordQuery
{
    constructor(
        public readonly username: string,
        public readonly password: string,
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}