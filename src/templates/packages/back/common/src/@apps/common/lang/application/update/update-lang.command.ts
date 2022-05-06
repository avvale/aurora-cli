import { QueryStatement } from 'aurora-ts-core';
import { CQMetadata } from 'aurora-ts-core';

export class UpdateLangCommand
{
    constructor(
        public readonly payload: {
            id: string,
            name?: string,
            image?: string,
            iso6392?: string,
            iso6393?: string,
            ietf?: string,
            customCode?: string,
            dir?: string,
            sort?: number,
            isActive?: boolean,
        },
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}