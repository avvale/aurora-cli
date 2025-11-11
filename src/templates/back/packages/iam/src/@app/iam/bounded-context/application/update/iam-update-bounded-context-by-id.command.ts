import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';

export class IamUpdateBoundedContextByIdCommand {
    constructor(
        public readonly payload: {
            id: string;
            name?: string;
            root?: string;
            sort?: number;
            isActive?: boolean;
        },
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
