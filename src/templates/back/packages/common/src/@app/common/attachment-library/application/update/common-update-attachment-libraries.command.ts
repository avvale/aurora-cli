import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';

export class CommonUpdateAttachmentLibrariesCommand
{
    constructor(
        public readonly payload: {
            id?: string;
            name?: string;
            path?: string;
            filename?: string;
            url?: string;
            mime?: string;
            extension?: string;
            size?: number;
            width?: number;
            height?: number;
            meta?: any;
        },
        public readonly queryStatement?: QueryStatement,
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
