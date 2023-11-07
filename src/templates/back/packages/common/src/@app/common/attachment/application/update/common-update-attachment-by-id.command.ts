import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';

export class CommonUpdateAttachmentByIdCommand
{
    constructor(
        public readonly payload: {
            id: string;
            familyId?: string;
            attachableId?: string;
            sort?: number;
            alt?: string;
            title?: string;
            originFilename?: string;
            filename?: string;
            mimetype?: string;
            extension?: string;
            relativePathSegments?: any;
            width?: number;
            height?: number;
            size?: number;
            url?: string;
            isCropable?: boolean;
            libraryId?: string;
            libraryFilename?: string;
            meta?: any;
        },
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
