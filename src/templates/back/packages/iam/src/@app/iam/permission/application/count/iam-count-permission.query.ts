import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';

export class IamCountPermissionQuery
{
    constructor(
        public readonly queryStatement?: QueryStatement,
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
