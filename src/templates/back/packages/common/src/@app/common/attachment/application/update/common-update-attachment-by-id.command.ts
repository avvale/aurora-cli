import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';

export class CommonUpdateAttachmentByIdCommand
{
    constructor(
        public readonly payload: {
            id: string;
            familyId?: string;
            sort?: number;
            alt?: string;
            title?: string;
            path?: string;
            filename?: string;
            url?: string;
            mime?: string;
            extension?: string;
            size?: number;
            width?: number;
            height?: number;
            libraryId?: string;
            libraryFilename?: string;
            meta?: any;
        },
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
