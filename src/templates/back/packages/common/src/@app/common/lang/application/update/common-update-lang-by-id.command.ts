import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';

export class CommonUpdateLangByIdCommand
{
    constructor(
        public readonly payload: {
            id: string;
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
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}