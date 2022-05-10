import { QueryStatement } from 'aurora-ts-core';
import { CQMetadata } from 'aurora-ts-core';

export class UpdateApplicationByIdCommand
{
    constructor(
        public readonly payload: {
            id: string;
            name?: string;
            code?: string;
            secret?: string;
            isMaster?: boolean;
            clientIds?: string[];
        },
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}