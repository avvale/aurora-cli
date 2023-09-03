import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';

export class CommonUpdateLangsCommand
{
    constructor(
        public readonly payload: {
            id?: string;
            name?: string;
            image?: string;
            iso6392?: string;
            iso6393?: string;
            ietf?: string;
            customCode?: string;
            dir?: string;
            sort?: number;
            isActive?: boolean;
        },
        public readonly queryStatement?: QueryStatement,
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
