import { QueryStatement } from 'aurora-ts-core';
import { CQMetadata } from 'aurora-ts-core';

export class UpdatePermissionByIdCommand
{
    constructor(
        public readonly payload: {
            id: string;
            name?: string;
            boundedContextId?: string;
            roleIds?: string[];
        },
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}