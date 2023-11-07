import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';

export class CommonUpdateAttachmentLibrariesCommand
{
    constructor(
        public readonly payload: {
            id?: string;
            filename?: string;
            originFilename?: string;
            mimetype?: string;
            extension?: string;
            relativePathSegments?: any;
            width?: number;
            height?: number;
            size?: number;
            url?: string;
            meta?: any;
        },
        public readonly queryStatement?: QueryStatement,
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
