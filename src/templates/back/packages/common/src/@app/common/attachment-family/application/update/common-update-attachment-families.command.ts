import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';

export class CommonUpdateAttachmentFamiliesCommand
{
    constructor(
        public readonly payload: {
            id?: string;
            resourceId?: string;
            code?: string;
            name?: string;
            width?: number;
            height?: number;
            fitType?: string;
            quality?: number;
            sizes?: any;
            format?: string;
        },
        public readonly queryStatement?: QueryStatement,
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
