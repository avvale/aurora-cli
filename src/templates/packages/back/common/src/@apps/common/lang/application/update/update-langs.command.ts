import { QueryStatement } from 'aurora-ts-core';
import { CQMetadata } from 'aurora-ts-core';

export class UpdateLangsCommand
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